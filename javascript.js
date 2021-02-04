$(document).ready(function(){
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
        onSelect: function(date){
            // A date variable is declared and initialised with a new date object
            var date = new Date(date);
            console.log(date);

            // The following function takes the month and turns it into a two digit number. e.g. 1 -> 01, 9 -> 09 etc
            function month2Digit(month){
                return (month < 10 ? "0" : "") + month;
            }

            // Using date object methods the date is converted into a shorthand yyyy-mm-dd format
            var year = date.getFullYear();
            var month = date.getMonth();
            var twoDigitMonth = month2Digit(month+1);
            var day = date.getDate();
            // The formatted date is declared as a variable
            var selectedDate = year + "-" + twoDigitMonth + "-" + day;
            console.log(selectedDate);  
            dateAPOD(selectedDate);
        }
    });

    // This selects s resonse based on which Options were selected by the User.//
        
    $( "div").click(function() {

        if ( $( "#pic_of_day").hasClass("selected")) {
            dateAPOD();
        }

        if ( $( "#moonphaseop").hasClass("selected")) {
            displayMoonPhase();
        }

        if ( $( "#sunriseop").hasClass("selected")) {
            setAndRiseTimings();

      } else {
        
      }

    });
    // This initializes the use of the modals for images
    $('.modal').modal();

    // A function to retrieve the APOD is declared
    var todaysAPOD = function(){
        var queryURL = "https://api.nasa.gov/planetary/apod?api_key=cmDLCxyrdP2i4juzoG1GGsSY4482bnXSdKLNPYmh";
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            console.log(response);
            console.log(queryURL);
            // var todayDateDisplay = $("<p>").text("Date: " + response.date);
            // var todayExDisplay = $("<p>").text("About: " + response.explanation);
            // var todayPicDisplay = $('<img>').attr("src", response.hdurl);
            // todayPicDisplay.attr("style", "height: 350px; width: 330px");
            // console.log(response.hdurl);
            // console.log(response.url);

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
            // $("#mediaCaption").clear();
            $("#mediaCaption").append(response.explanation);

            // console.log(response.date);
            // var newDiv = $('<div>');
            // newDiv.append(todayDateDisplay, todayExDisplay, todayPicDisplay);
            // $("#todayPic").html(newDiv);
        })
    }
    // The function to retrieve the APOD is initialised
    todaysAPOD();




    function dateAPOD(selectedDate) {
        var selectedDate;
        var dateQueryURL = "https://api.nasa.gov/planetary/apod?api_key=cmDLCxyrdP2i4juzoG1GGsSY4482bnXSdKLNPYmh&date=" + selectedDate;
        $.ajax({
            url: dateQueryURL,
            method: 'GET'
        })
            .then(function (response) {
                console.log(response);
                console.log(dateQueryURL);
                // var inputDateDisplay = $("<p>").text("Date: " + response.date);
                // var inputExDisplay = $("<p>").text("About: " + response.explanation);
                // var inputPicDisplay = $('<img>').attr("src", response.hdurl);
                // inputPicDisplay.attr("style", "height: 350px; width: 330px");
                // console.log(response.hdurl);
                // console.log(response.date);

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
                // $("#mediaCaption").clear();
                $("#mediaCaption").append(response.explanation);
                // var newDiv = $('<div>');
                // newDiv.append(inputDateDisplay, inputExDisplay, inputPicDisplay);
                // $("#inputPic").html(newDiv);
            })
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
                var moonPhase = $.parseJSON(response);
                console.log(moonPhase);
                console.log(moonURL + "month" + "=" + mm + "&" + "year" + "=" + year);
                var currentDate = dd + " " + moonPhase.monthName + " " + moonPhase.year
                var moonDiv = $("#ex4");
                var dayDiv = "<div>" + "<b>" + currentDate + "</b>" + "</div>"
                var moonSVG =  "<div shadow>" + moonPhase.phase[dd].svg + "</div>"
                var phaseOfMoon = "<div>" + "<b>" + moonPhase.phase[dd].phaseName + " " +
                "" + ((moonPhase.phase[dd].isPhaseLimit )? ""  :   Math.round(moonPhase.phase[dd].lighting) + "%") + "</b>" +
                "</div>"
                var moonHTML = dayDiv + moonSVG + phaseOfMoon
                moonDiv.html(moonHTML);
            });
        }
        displayMoonPhase();
})

// This event states that upon pressing a key a function will be executed
$("#locationQuery").on("keypress", function(e){
    // If the enter key is pressed then the user's input is assigned to variable q
    if(e.key === "Enter"){
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
var buildGeoCodeURL = function(q){
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + q + "&appid=c7fb2f80502825ecbe90a5fece0767e4";
    // q = "city, country code" - birmingham, gb 
    console.log(queryURL);
    ajaxCall(queryURL);
}

// This function handles the AJAX calls for the GeoCode & IPGeoLocation APIs
var ajaxCall = function(queryURL){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(serverResponse){
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
        }).then(function(serverResponse){
            console.log(serverResponse);

        })
    })
}
