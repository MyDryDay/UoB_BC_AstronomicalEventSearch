$(document).ready(function(){
    $("select").formSelect();
    var values = $("select").formSelect("getSelectedValues");
    console.log(values);
})