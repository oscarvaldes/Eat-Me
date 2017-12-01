$(document).ready(function () {


    $('#createEvent').click(function () {

        $('#mainCreateEvent').hide();
        $('.container').show();

    });


    $('#Add').click(function () {

        $('#mainCreateEvent').show();
        $('.container').hide();

        var foodItem;
        var foodDescription

        foodItem = $('#FoodName').val();
        foodDescription = $('#description').val();

        console.log(foodItem);

        $('#content').append("<div id='clock'>" + foodItem + "<br />" + foodDescription + "</div>");

    });

    $('#cancelSubmit').click(function () {
        var val1 = $(this).text();

        $('#mainCreateEvent').show();
        $('.container').hide();

    });

    var tdVal = "";

    $('td').click(function () {
        var val1 = $(this).text();

        if (val1 != "PM" && val1 != "AM") {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                $(this).addClass('selected');
                console.log($(this).text());
            }
        }

    });

    $("#datepicker").datepicker();


});
