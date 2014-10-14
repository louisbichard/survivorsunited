//#BACKEND

//###REQUIRED LIBRARIES
var port = process.env.PORT || 3000;
var http = require('http');

//###REQUIRE EXPRESS
var express = require('express');

//###REQUIRE UTILTIES
var colors = require('colors');

//###REQUIRE PASSPORT
var passport = require('passport');
var passportLocal = require('passport-local');

//###REQUIRE EXPRESS ADD ON'S
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//###INITIALISE EXPRESS APP
var app = express();

//###SETUP EXPRESS ADD ON'S
app.use(cookieParser())

//Setup both body parser for JSON, and basic form encoding
.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(session({
        secret: 'lou',
        resave: true,
        saveUninitialized: true
    }));

//##COOKIE SETUP
require('./utilities/cookies.js')(app);

//##HEADER SETUP
require('./utilities/headers.js')(app);

//##ROUTES
require('./utilities/backend.routes.js')(app, passport);

//##PORT SETUP
app.listen(port);
console.log("Server running at http://127.0.0.1:" + port + "/");