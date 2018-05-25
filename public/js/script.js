$(document).ready( () => {

    $("#goToAdvancedSearch").click(() => {

        $("#szukaj1").hide();
        $("#szukaj1_advanced").show();
    });

    $("#goToSimpleSearch").click(() => {

        $("#szukaj1").show();
        $("#szukaj1_advanced").hide();
    });


    $('#szukaj1_advanced').on('click', '.removeSearchCondition', (event) => {
        $(event.target).closest(".input-group").remove();
    });

    $("#addNextSearchTag").click(() => {

        $(".input-group:last").after(`<div class="input-group">

            <select name="search_for" class="form-control">
                <option value="title">tytuł</option>
                <option value="author">autor</option>
                <option value="category">kategoria</option>
                <option value="series">seria</option>
            </select>

            <input type="search" name="find_item" class="form-control" placeholder="Wpisz szukaną frazę" aria-label="Szukaj">

            <span class="btn btn-info removeSearchCondition" >
                <i class="fa fa-close"></i>
            </span>

            <select name="search_condition" class="form-control btn search_condition">
                <option value="AND">AND</option>
                <option value="OR">OR</option>
            </select>
        </div>`)

    });

});