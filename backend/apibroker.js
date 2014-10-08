var port = process.env.PORT || 3000; 
var http = require('http');
var url = require('url');
var colors = require('colors');
var passport = require('passport');
var incrementer = 0;
var LocalStrategy = require('passport-local').Strategy;
var session      = require('express-session');


//===============EXPRESS================
var express = require('express');
var app = express();

app.use(session({ secret: 'lou', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//===============AUTHENTICATION STATEGIES================
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

//===============ROUTES===============

require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

//===============PORT=================
app.listen(port);
console.log("Server running at http://127.0.0.1:" + port + "/");