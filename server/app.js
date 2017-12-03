var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser-json'),
    cors = require('cors'),
    landingpage = require('./routes/store-user-info-service'),
    login = require('./routes/login-service'),
    register = require('./routes/register-service'),
    moment = require('moment'),
    app = express();

const session = require('express-session');
const request = require('request');

app.use(cors());
// app.use(favicon('./client/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({
    secret: "ewhfblkhrbrekhagvbr"
}));

app.use(express.static(path.join(__dirname, '../client')));
app.use('/landingpage', landingpage);
app.use('/login', login);
app.use('/register', register);

app.use(function setAuthLocal(req, res, next) {
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
    } else {
        res.locals.users = null;
    }
    next();
});

app.get('/', function (req, res) {
    // res.render("index");
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/logout', require_authentication, function (req, res) {
    delete req.session.user;
    res.sendFile(path.join(__dirname, '/../views/index.html'));
});


// helper functions

function require_authentication(req, res, next) {
    if (res.locals.user != null) {
        next();
    } else {
        res.redirect('/');
        return;
    }
}

module.exports = app;
