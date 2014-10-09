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
    }))

//###INITIALISING PASSPORT
    .use(passport.initialize())
    .use(passport.session());

//###PASSPORT LOCAL STRATEGY
passport.use(new passportLocal.Strategy(function(username, password, done) {    
    console.log(' in passport strat', username, password, done);
    // **TODO:** Update to fake DB
    if (username === password) return done(null, {
        id: username,
        name: username
    });
    else return done(null, null);

}));

//###PASSPORT SERALISE USER
passport.serializeUser(function(user, done) {
  console.log('serialising', user, done);
    done(null, user.id);
});

//###PASSPORT DESERIALISE USER
passport.deserializeUser(function(id, done) {
    //Query database or cache here
    console.log('deserialising', id, done);
    done(null, {
        id: id,
        name: id
    });
});

//##ROUTES

require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

//##PORT SETUP
app.listen(port);
console.log("Server running at http://127.0.0.1:" + port + "/");