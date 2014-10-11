//REQUIRED LIBRARIES
//------------------
var url = require('url');
var incrementer = 0;
var colors = require('colors');

//API ENDPOINTS
//=============

module.exports = function(app, passport) {

    //ALLOW CORS
    //----------
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    //DEFAULT ENDPOINT
    //----------------
    app.get('/', function(req, res) {
        res.end("isAuth called, is auth " + req.isAuthenticated());
    });

    //AUTHENTICATION API'S
    //====================

    //LOGIN
    //-----
    app.post('/login', passport.authenticate('local'), function(req, res, next) {
        res.end("isAuth called, is auth " + req.isAuthenticated());
    });

    //LOGOUT
    //-----
    app.get('/logout', function(req, res) {
        req.logout();
        res.end("isAuth called, is auth " + req.isAuthenticated());
    });

    //REGISTER
    //-----
    app.post('/register', function(req, res) {
        colourful_output('/register');
        var result = require('./auth/register.js')(res, req);
        return result.then(function(data) {            
            data = JSON.stringify(data);

            return res.end(data);
        }).caught(function(err) {
            // **TODO** Implement better handling
            err = JSON.stringify(err);
            return res.end(err);
        })
    });

    //IS AUTHENTICATED
    //----------------
    app.get('/isAuthenticated', function(req, res) {
        res.end("isAuth called, is auth " + req.isAuthenticated());
    });

    //USER API'S
    //==========

    //USER ENDPOINTS
    //--------------    
    app.get('/user/listall', function(req, res) {
        colourful_output('/user/listall');

        // Return and display API
        var result = require('./users/listall.js')();
        return result.then(function(data) {
            return res.end(data);
        }).caught(function(err) {

            // **TODO** Implement better handling            
            return res.end(err);
        })
    });

    app.post('/user/remove', function(req, res) {
        colourful_output('/user/remove');
        var result = require('./users/remove.js')(res, req);
        return result.then(function(data) {            
            data = JSON.stringify(data);
            return res.end(data);
        }).caught(function(err) {
            // **TODO** Implement better handling
            err = JSON.stringify(err);
            return res.end(err);
        })
    });

};


var colourful_output = function(api_name) {
    console.log('API called: '.green + api_name.blue);
}