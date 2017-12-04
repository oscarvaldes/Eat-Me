$(document).ready(function () {

    //Load users personal blog data (if any)
    data = {
        email:window.name
    };
    $.ajax({
        type: 'GET',                       // define the type of HTTP verb we want to use (POST for our form)
        url: 'http://localhost:3000/load',           // the url where we want to POST
        data: data,                         // our data object
        dataType: 'text'                    // what type of data do we expect back from the server
    }).done(function (data, _, out) {
        // $('#content').prepend('<img id="clock" src="' + stringVal + '" />' + '<br />' + '<br />' + '<div id="clock">' + "Food Item: " + foodItem + '<br />' + '<br />' + "Log Date: " + date + '<br />' + '<br />' + "Recipe/Description: " + '<br />' + '<br />' + foodDescription + '</div>');
        data = JSON.parse(data);
        for(i=0;i <data.length;i++){
            $('#content').prepend('<img id="clock" src="' + data[i].fileName + '" />' + '<br />' + '<br />' + '<div id="clock">' + "Food Item: " + data[i].foodName + '<br />' + '<br />' + "Log Date: " + data[i].date + '<br />' + '<br />' + "Recipe/Description: " + '<br />' + '<br />' + data[i].description + '</div>');

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
            // $('#content').prepend('<img id="clock" src="' + stringVal + '" />' + '<br />' + '<br />' + '<div id="clock">' + "Food Item: " + foodItem + '<br />' + '<br />' + "Log Date: " + date + '<br />' + '<br />' + "Recipe/Description: " + '<br />' + '<br />' + foodDescription + '</div>');


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
