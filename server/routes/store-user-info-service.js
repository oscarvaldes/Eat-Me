var express = require('express'),
    mysql = require('mysql'),
    fs = require('fs'),
    router = express.Router(),
    bodyParser = require('body-parser-json'),
    path = require('path'),
    moment = require('moment'),
    db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'on-hour-time',
        multipleStatements: 'true'
    });

const session = require('express-session');
const request = require('request');

router.use(bodyParser.urlencoded({
    extended: true
}));

db.connect(function (err) {
    if (!err) {
        console.log(' ');
        console.log(' ');
        console.log('____________________________________________________________________');
        console.log('Database is connected!');
    } else {
        console.log('Error connecting database: ' + err);
    }
}); //db.connect

router.use(function setAuthLocal(req, res, next) {
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
    } else {
        res.locals.users = null;
    }
    next();
});

router.post('/', require_authentication, function (req, res, next) {
    var currentTimestamp = moment().unix();//in seconds
    var currentDatetime = moment(currentTimestamp*1000).format("YYYY-MM-DD HH:mm:ss");
    var date = currentDatetime;
    var fileName = req.body.fileName;
    var foodName = req.body.foodName;
    var description = req.body.description;
    console.log(date);
    console.log(fileName);
    console.log(foodName);
    console.log(description);
    console.log(req.session.user);//email

    var sql = 'INSERT INTO `on-hour-time`.`' + req.session.user + '`(`description`,`foodName`,`fileName`,`date`)VALUES(\'' + description + '\',\'' + foodName + '\',\'' + fileName + '\',\'' + date + '\')';
    db.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
        }

    });

    var sql2 = 'SELECT * FROM `on-hour-time`.`' + req.session.user + '`';
    db.query(sql2, function (err, rows, fields) {
        if (err) {
            console.log(err);
        }

        res.send(rows);

    });
    // res.send(true);

}); //router.post
router.get('/', require_authentication, function (req, res, next) {
    console.log(req.query.email);
    res.sendFile(path.join(__dirname, '../../views/landingpage.html'));

}); //router.get

//helper functions
function require_authentication(req, res, next) {
    if (res.locals.user != null) {
        next();
    } else {
        res.redirect('/');

    }
}

module.exports = router;
