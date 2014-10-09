//REQUIRED LIBRARIES
//------------------
var url = require('url');
var incrementer = 0;
var colors = require('colors');

//API ENDPOINTS
//=============

module.exports = function(app, passport) {

    //DEFAULT (ROOT) API
    //==================

    //DEFAULT ENDPOINT
    //----------------
    app.get('/', function(req, res) {
        res.end("isAuth called, is auth " + req.isAuthenticated() );
    });

    //AUTHENTICATION API'S
    //====================

    //LOGIN
    //-----
    app.post('/login', passport.authenticate('local'), function(req, res, next) {
        res.end("isAuth called, is auth " + req.isAuthenticated() );
    });

    //LOGOUT
    //-----
    app.get('/logout', function(req, res) {
        req.logout();
        res.end("isAuth called, is auth " + req.isAuthenticated() );
    });

    //IS AUTHENTICATED
    //----------------
    app.get('/isAuthenticated', function(req, res) {
        res.end("isAuth called, is auth " + req.isAuthenticated() );
    });

    //USER API'S
    //==========

    //USER ENDPOINTS
    //--------------
    app.get('/user/listall', function(req, res) {

        // Verbose output
        console.log('API called: '.green + 'listall'.blue);

        // Return and display API
        var result = require('./users/listall.js')();
        return result.then(function(data){
            return res.end(data);    
        }).caught(function(err){
            // **TODO** Implement better handling
            console.log(err);
            return res.end(err);
        })
    });

};