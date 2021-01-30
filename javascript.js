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
})
