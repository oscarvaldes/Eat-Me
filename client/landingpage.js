$(document).ready(function () {

    //Load users personal blog data (if any)
    data = {
        email: window.name
    };
    $.ajax({
        type: 'GET',                       // define the type of HTTP verb we want to use (POST for our form)
        url: 'http://localhost:3000/load',           // the url where we want to POST
        data: data,                         // our data object
        dataType: 'text'                    // what type of data do we expect back from the server
    }).done(function (data, _, out) {
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            var formatDate = new Date(Date.parse(data[i].date));
            $('#content').prepend('<img class="foodImage" src="' + data[i].fileName + '" />' + "Food Item: ".bold() + data[i].foodName + '<br>' + '<br>' + "Date Posted: ".bold() + formatDate + '<br>' + '<br>' + "Recipe/Description: ".bold() + '<br>' + data[i].description + '<br><br>');

        }

    }).fail(function (data) {

    });

    $('#AddRecipe').click(function () {

        $('#mainCreateEvent').hide();
        $('.container').show();

    });

    $('#logout').click(function () {
        window.location.href = "http://localhost:3000/logout";

    });//end of logout click


    $('#Add').click(function () {

        $('#mainCreateEvent').show();
        $('.container').hide();

        var foodItem;
        var foodDescription;
        // var date;
        var fileName;
        var stringVal;

        // date = $('#datePicker').val();

        fileName = $('#getVal').val();

        foodItem = $('#FoodName').val();
        foodDescription = $('#description').val();

        //send data to specific route

        data = {
            // date: date,
            fileName: fileName,
            foodName: foodItem,
            description: foodDescription

        };
        $.ajax({
            type: 'POST',                       // define the type of HTTP verb we want to use (POST for our form)
            url: 'http://localhost:3000/landingpage',           // the url where we want to POST
            data: data,                         // our data object
            dataType: 'text'                    // what type of data do we expect back from the server
        }).done(function (data, _, out) {
            window.location.href = "http://localhost:3000/landingpage";

        }).fail(function (data) {

        });


        //With everything
        //$('#content').prepend('<img id="clock" src="' + stringVal + '" />' + '<br />' + '<br />' + '<div id="clock">' + "Food Item: " + foodItem + '<br />' + '<br />' + "Log Date: " + date + '<br />' + '<br />' + "Recipe/Description: " + '<br />' + '<br />' + foodDescription + '</div>');

    });

    $('#cancelSubmit').click(function () {

        $('#mainCreateEvent').show();
        $('.container').hide();

    });

    // $("#datePicker").datepicker();


});
