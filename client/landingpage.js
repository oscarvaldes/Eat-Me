$(document).ready(function () {


    $('#createEvent').click(function () {

        $('#mainCreateEvent').hide();
        $('.container').show();

    });

    $('#logout').click(function () {
        window.location.href = "http://localhost:3000/logout";

    });//end of logout click


    $('#Add').click(function () {

        $('#mainCreateEvent').show();
        $('.container').hide();

        date = $('#datePicker').val();

        var foodItem;
        var foodDescription;
        var date;
        var fileName;
        var stringVal;

        fileName = $('#getVal').val();
        stringVal = fileName.toString();

        console.log($('#getVal').val());

        foodItem = $('#FoodName').val();
        foodDescription = $('#description').val();

        //send data to specific route


        //With everything
        $('#content').prepend('<img id="clock" src="' + stringVal + '" />' + '<br />' + '<br />' + '<div id="clock">' + "Food Item: " + foodItem + '<br />' + '<br />' + "Log Date: " + date + '<br />' + '<br />' + "Recipe/Description: " + '<br />' + '<br />' + foodDescription + '</div>');

    });

    $('#cancelSubmit').click(function () {

        $('#mainCreateEvent').show();
        $('.container').hide();

    });

    $("#datePicker").datepicker();


});
