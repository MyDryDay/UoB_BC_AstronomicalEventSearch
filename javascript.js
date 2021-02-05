$(document).ready(function () {
    // This initializes the use of the multi-select dropdown menu on the navbar
    $("select").formSelect();
    // This assigns a value to the selected values (none at this point) and creates an empty array calles values
    var values = $("select").formSelect("getSelectedValues");
    // This prints the values array to the console
    console.log(values);

    // This initialises the datepicker
    $("#datepicker").datepicker({
        format: "yyyy/mm/dd",
        autoClose: true,
        // Upon selecting a date a function is run
        onSelect: function (date) {
            // A date variable is declared and initialised with a new date object
            var date = new Date(date);
            console.log(date);

            // The following function takes the month and turns it into a two digit number. e.g. 1 -> 01, 9 -> 09 etc
            function month2Digit(month) {
                return (month < 10 ? "0" : "") + month;
            }

            // Using date object methods the date is converted into a shorthand yyyy-mm-dd format
            var year = date.getFullYear();
            var month = date.getMonth();
            var twoDigitMonth = month2Digit(month + 1);
            var day = date.getDate();
            // The formatted date is declared as a variable
            selectedDate = year + "-" + twoDigitMonth + "-" + day;
            console.log(selectedDate);
            dateAPOD(selectedDate);
        }
    });

    // This initializes the use of the modals for images
    $('.modal').modal();

    // The function to retrieve the APOD is initialised
    todaysAPOD();

    displayMoonPhase();
})

var selectedDate;

// This event states that upon pressing a key a function will be executed
$("#locationQuery").on("keypress", function (e) {
    // If the enter key is pressed then the user's input is assigned to variable q
    if (e.key === "Enter") {
        // Prevents the default action of the event
        e.preventDefault();
        var q = $("#locationQuery").val();
        // The following removes white space/spaces from the input
        q = q.replace(/\s/g, "");
        console.log(q);
        // A function to build the queryURL for the GeoCode API is built
        buildGeoCodeURL(q);
    }
    

});

// This function takes the user input previously assigned to variable q and concatenates it into the queryURL
// It then calls the ajaxCall function
var buildGeoCodeURL = function (q) {
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + q + "&appid=c7fb2f80502825ecbe90a5fece0767e4";
    // q = "city, country code" - birmingham, gb 
    console.log(queryURL);
    ajaxCall(queryURL);
}

var getCaption = function(response){
    if($("#mediaCaption") == ""){
        $("#mediaCaption").append(response.explanation);
    }else if($("#mediaCaption") !== ""){
        $("#mediaCaption").empty();
        $("#mediaCaption").append(response.explanation);
    }
}


var checkMediaType = function(response){
    // This statement determines what content is shown depending on the server response
    if(response.media_type == "image"){
        console.log(response.hdurl);
        $("#apodVideo").css("display", "none");
        $("#apodImg").css("display", "block");
        $("#apodImg").attr("src", response.hdurl);
        $("#modal-content").attr("src", response.hdurl);
    } else if(response.media_type == "video"){
        console.log(response.url);
        $("#apodImg").css("display", "none");
        $("#apodVideo").css("display", "block");
        $("#apodVideo").attr("src", response.url);
        $("#modal-content").attr("src", response.url);
    }
}

// This function handles the AJAX calls for the GeoCode & IPGeoLocation APIs
var ajaxCall = function (queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (serverResponse) {
        console.log(serverResponse);
        // The lat & lon are obtained for whichever city the user inputs
        var lat = serverResponse[0].lat;
        var lon = serverResponse[0].lon;
        console.log(lat);
        console.log(lon);

        // The lat & lon are concatenated into the next queryURL
        var queryURL2 = "https://api.ipgeolocation.io/astronomy?apiKey=ae017480db3c4202bb6465acbc3845b1&lat=" + lat + "&long=" + lon;

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (serverResponse) {
            console.log(serverResponse);

        });


        // AstroAPI call 
        // var date = 2020 - 01 - 01;
        console.log(lat);
        var queryURL3 = "http://api.worldweatheronline.com/premium/v1/astronomy.ashx?key=3430ff6446954353b06203241210102" + "&q=" + lat + "," + lon + "&date=" + selectedDate + "&format=json";

        $.ajax({
            url: queryURL3,
            method: "GET"
        }).then(function (serverResponse) {
            console.log(serverResponse);

            console.log(serverResponse.data.time_zone[0].moonrise);
            console.log(serverResponse.data.time_zone[0].moonset);
            console.log(serverResponse.data.time_zone[0].moon_phase);
            console.log(serverResponse.data.time_zone[0].moon_illumination);
            console.log(serverResponse.data.time_zone[0].sunrise);
            console.log(serverResponse.data.time_zone[0].sunset);

            //Server response saved into variable
            var sunrise = serverResponse.data.time_zone[0].sunrise;
            var sunset = serverResponse.data.time_zone[0].sunset;
            var moonrise = serverResponse.data.time_zone[0].moonrise;
            var moonset = serverResponse.data.time_zone[0].moonset;
            console.log(sunrise, sunset, moonrise, moonset)
            sunAndMoonIcon();
            setAndRiseTimings(serverResponse);



           
        });
    });

   
}

// A function to retrieve the APOD is declared
var todaysAPOD = function () {
    var queryURL = "https://api.nasa.gov/planetary/apod?api_key=cmDLCxyrdP2i4juzoG1GGsSY4482bnXSdKLNPYmh";
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);
        // var todayDateDisplay = $("<p>").text("Date: " + response.date);
        // var todayExDisplay = $("<p>").text("About: " + response.explanation);
        // var todayPicDisplay = $('<img>').attr("src", response.hdurl);
        // todayPicDisplay.attr("style", "height: 350px; width: 330px");
        // console.log(response.hdurl);
        // console.log(response.url);

        checkMediaType(response);

        getCaption(response);

        // console.log(response.date);
        // var newDiv = $('<div>');
        // newDiv.append(todayDateDisplay, todayExDisplay, todayPicDisplay);
        // $("#todayPic").html(newDiv);
    })
}

function dateAPOD(selectedDate) {
    var selectedDate;
    var dateQueryURL = "https://api.nasa.gov/planetary/apod?api_key=cmDLCxyrdP2i4juzoG1GGsSY4482bnXSdKLNPYmh&date=" + selectedDate;
    $.ajax({
        url: dateQueryURL,
        method: 'GET'
    }).then(function (response) {
            console.log(response);
            console.log(dateQueryURL);
            // var inputDateDisplay = $("<p>").text("Date: " + response.date);
            // var inputExDisplay = $("<p>").text("About: " + response.explanation);
            // var inputPicDisplay = $('<img>').attr("src", response.hdurl);
            // inputPicDisplay.attr("style", "height: 350px; width: 330px");
            // console.log(response.hdurl);
            // console.log(response.date);

            checkMediaType(response);

            getCaption(response);
            // var newDiv = $('<div>');
            // newDiv.append(inputDateDisplay, inputExDisplay, inputPicDisplay);
            // $("#inputPic").html(newDiv);
    })
}

 //Function to display times for sunrise, moonrise, sunset & moonset
 function setAndRiseTimings(serverResponse) {
    //These timing variables are derived from the Object returned from the WorldWeatherOnline API   
    var sunrise = serverResponse.data.time_zone[0].sunrise;
    var sunset = serverResponse.data.time_zone[0].sunset;
    var moonrise = serverResponse.data.time_zone[0].moonrise;
    var moonset = serverResponse.data.time_zone[0].moonset;
    console.log(sunrise, sunset, moonrise, moonset)
    //Sun and Moon widget is populated with the timings for sun/moon set and rise. 
    var sunriseP = $("#sunrise-p");
    sunriseP.text("Sunrise: " + sunrise);
    var moonriseP = $("#moonrise-p");
    moonriseP.text("Moonrise: " + moonrise);
    var sunsetP = $("#sunset-p");
    sunsetP.text("Sunset: " + sunset);
    var moonsetP = $("#moonset-p");
    moonsetP.text("Moonset: " + moonset);
}

//Function to display icons for sunrise, moonrise, sunset & moonset when user inputs location
function sunAndMoonIcon() {
    var sunriseIMG = $("#sunrise-icon");
    sunriseIMG.attr({ "src": "img/sunrise.svg", "height": "50px", "width": "50px" });
    var sunsetIMG = $("#sunset-icon");
    sunsetIMG.attr({ "src": "img/sunset.svg", "height": "50px", "width": "50px" })
    var moonriseIMG = $("#moonrise-icon");
    moonriseIMG.attr({ "src": "img/moonrise.svg", "height": "50px", "width": "50px" });
    var moonsetIMG = $("#moonset-icon");
    moonsetIMG.attr({ "src": "img/moonset.svg", "height": "50px", "width": "50px" });
}

//This function displays the Moon phase for the day
function displayMoonPhase() {
    var moonURL = "https://www.icalendar37.net/lunar/api/?lang=en&";
    var today = new Date();
    var dd = (today.getDate())
    var mm = (today.getMonth() + 1);
    var year = today.getFullYear();
    $.ajax({
        url: moonURL + "month" + "=" + mm + "&" + "year" + "=" + year,
        method: "GET",
    }).then(function (response) {
        var moonPhase = $.parseJSON(response);  //parses the response from the Lunar calendar API and stores it into the moonPhase variable
        console.log(moonPhase);
        console.log(moonURL + "month" + "=" + mm + "&" + "year" + "=" + year);
        var currentDate = dd + " " + moonPhase.monthName + " " + moonPhase.year //Gives you the current date based on local time
        var moonDiv = $("#ex4");
        var dayDiv = "<div>" + "<b>" + currentDate + "</b>" + "</div>"
        var moonSVG = "<div shadow>" + moonPhase.phase[dd].svg + "</div>" //Gives you the SVG of the moon
        var phaseOfMoon = "<div>" + "<b>" + moonPhase.phase[dd].phaseName + " " +
            "" + ((moonPhase.phase[dd].isPhaseLimit) ? "" : Math.round(moonPhase.phase[dd].lighting) + "%") + "</b>" +
            "</div>" //Returns the phase the moon is currently in along with the percentage
        var moonHTML = dayDiv + moonSVG + phaseOfMoon
        moonDiv.html(moonHTML);
    });
}



var astroAPI = function(){
    var queryURL3 = "https://api.worldweatheronline.com/premium/v1/astronomy.ashx?key=3430ff6446954353b06203241210102" + "&q=" + lat + "," + lon + "&date=" + selectedDate + "&format=json";

    $.ajax({
        url: queryURL3,
        method: "GET"
    }).then(function (serverResponse) {
        console.log(serverResponse);

        console.log(serverResponse.data.time_zone[0].moonrise);
        console.log(serverResponse.data.time_zone[0].moonset);
        console.log(serverResponse.data.time_zone[0].moon_phase);
        console.log(serverResponse.data.time_zone[0].moon_illumination);
        console.log(serverResponse.data.time_zone[0].sunrise);
        console.log(serverResponse.data.time_zone[0].sunset);

        //Server response saved into variable
        var sunrise = serverResponse.data.time_zone[0].sunrise;
        var sunset = serverResponse.data.time_zone[0].sunset;
        var moonrise = serverResponse.data.time_zone[0].moonrise;
        var moonset = serverResponse.data.time_zone[0].moonset;
        console.log(sunrise, sunset, moonrise, moonset)
        sunAndMoonIcon();
        setAndRiseTimings(serverResponse);




    });
}
