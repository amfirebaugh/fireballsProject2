$(document).ready(function() {

    // for new-user.pug dropdown menus
    $('.rxAge').on('click', function() {
        $('.btn#dropdownAgeButton').text($(this).text());
    });

    $('.rxSex').on('click', function() {
        $('.btn#dropdownSexButton').text($(this).text());
    });

});