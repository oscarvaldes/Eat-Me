var express = require('express'),
    mysql = require('mysql'),
    fs = require('fs'),
    router = express.Router(),
    bodyParser = require('body-parser-json'),
    crypto = require('crypto'),
    passwordHash = require('password-hash'),
    path = require('path'),
    db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Blue$apph1re#2',
        database: 'on-hour-time',
        multipleStatements: 'true'
    }),
    moment = require('moment');

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

router.post('/', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var sql = 'SELECT * FROM `on-hour-time`.login WHERE email=\'' + email + '\'';
    var getPassword = 'SELECT password FROM `on-hour-time`.login WHERE email=\'' + email + '\'';

    db.query(sql, function (err, rows, fields) {

        if (rows.length == 0) {
            console.log('User Log in Failed: User does not exist');
            res.send(false);
        }
        else {
            //user exists
            db.query(getPassword, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                }
                //verify here
                if (passwordHash.verify(password, rows[0].password)) {

                    req.session.user = email;
                    res.send(true);
                    // res.sendFile(path.join(__dirname, '../../views/landingpage.html'));

                    // res.sendFile(__dirname + '/views/landingpage.html');
                    // res.sendFile(path.join(__dirname + '../../views/landingpage.html'));
                    // res.render('page');
                    // res.send(true);
                }
                else {
                    res.send('password');
                }

            });

        }
    }); //query


}); //router.post

router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../views/index.html'));

}); //router.get

//helper functions
function require_authentication(req, res, next) {
    if (res.locals.user != null) {
        next();
    } else {
        res.redirect('/');
        return;
    }
}

module.exports = router;
