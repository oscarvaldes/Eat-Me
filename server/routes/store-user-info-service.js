var express = require('express'),
    mysql = require('mysql'),
    fs = require('fs'),
    router = express.Router(),
    bodyParser = require('body-parser-json'),
    path = require('path'),
    moment = require('moment');

const session = require('express-session');
const request = require('request');

router.use(bodyParser.urlencoded({
  extended: true
}));

router.post('/',require_authentication, function(req, res, next) {

}); //router.post
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../../views/landingpage.html'));

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
