<<<<<<< HEAD
$(document).ready(function () {
=======
$(document).ready(function(){
    // This initializes the use of the multi-select dropdown menu on the navbar
>>>>>>> 0b9cc490311191e6b3ee3e031c147a20673eeadc
    $("select").formSelect();
    // This assigns a value to the selected values (none at this point) and creates an empty array calles values
    var values = $("select").formSelect("getSelectedValues");
    // This prints the values array to the console
    console.log(values);

<<<<<<< HEAD
})


$("#datepicker").datepicker({
format: "yyyy/mm/dd"
});


=======
    // This initializes the use of the modals for images
    $('.modal').modal();
})
>>>>>>> 0b9cc490311191e6b3ee3e031c147a20673eeadc
