$(document).ready( () => {

    $("#goToAdvancedSearch").click(() => {

        $("#szukaj1").hide();
        $("#szukaj1_advanced").show();
    });

    $("#goToSimpleSearch").click(() => {

        $("#szukaj1").show();
        $("#szukaj1_advanced").hide();
    });

});