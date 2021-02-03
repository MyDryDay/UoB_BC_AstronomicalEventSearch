$(document).ready(function(){
    // This initializes the use of the multi-select dropdown menu on the navbar
    $("select").formSelect();
    // This assigns a value to the selected values (none at this point) and creates an empty array calles values
    var values = $("select").formSelect("getSelectedValues");
    // This prints the values array to the console
    console.log(values);

    $("#datepicker").datepicker({
        format: "yyyy/mm/dd"
    });

    // This initializes the use of the modals for images
    $('.modal').modal();

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

$("#locationQuery").on("keypress", function(e){
    e.preventDefault();
    if(e.key === "Enter"){
        var q = $("#locationQuery").val();
        q = q.replace(/\s/g, "");
        console.log(q);
        buildGeoCodeURL(q);
    }

});

var buildGeoCodeURL = function(q){
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + q + "&appid=c7fb2f80502825ecbe90a5fece0767e4";
    // q = "city, country code" - birmingham, gb 
    console.log(queryURL);
    ajaxCall(queryURL);
}

var ajaxCall = function(queryURL){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(serverResponse){
        console.log(serverResponse);
        var lat = serverResponse[0].lat;
        var lon = serverResponse[0].lon;
        console.log(lat);
        console.log(lon);

        var queryURL2 = "https://api.ipgeolocation.io/astronomy?apiKey=ae017480db3c4202bb6465acbc3845b1&lat=" + lat + "&long=" + lon;
        
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(serverResponse){
            console.log(serverResponse);
        })
    })
}
