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
        password: 'Blue$apph1re#2',
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

}); //router.post
router.get('/', require_authentication, function (req, res, next) {
    console.log(req.query.email);
    res.send(true);

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
