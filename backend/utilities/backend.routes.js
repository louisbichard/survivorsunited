//REQUIRED LIBRARIES
//------------------
var colors = require('colors');
var uuid = require('node-uuid');
var sessions = require('./../auth/sessions.js');

//API ENDPOINTS
//=============

module.exports = function(app) {

    //AUTHENTICATION API'S
    //====================

    //LOGIN
    //-----
    app.post('/auth/login', function(req, res, next) {
        colourful_output('/auth/login');
        var result = require('./auth/login.js')(res, req);
        return result.then(function(data) {
            data = JSON.stringify(data);
            return res.end(data);
        }).caught(function(err) {
            // **TODO** Implement better handling
            err = JSON.stringify(err);
            return res.end(err);
        });
    });

    //LOGIN
    //-----
    app.get('/auth/isauthenticated', function(req, res, next) {
        colourful_output('/auth/isauthenticated');
        return sessions.isAuthenticated(req.cookies.auth).then(function(data) {
            data = JSON.stringify(data);
            return res.end(data);
        }).caught(function(err) {
            // **TODO** Implement better handling
            err = JSON.stringify(err);
            return res.end(err);
        });
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
        });
    });


    //SESSION API'S
    //=============
    app.get('/sessions/listall', function(req, res) {
        colourful_output('/sessions/listall');
        return require('./../sessions/sessions.listall.js')()
            .then(function(data) {
                return res.end(data);
            })
            .caught(function(err) {
                // **TODO:** do this better
                return res.end('error in caught' + err);
            });

    });

    //USER ENDPOINTS
    //--------------    
    app.get('/user/listall', function(req, res) {
        colourful_output('/user/listall');
        return require('./../users/users.listall.js')()
            .then(function(data) {
                return res.end(data);
            })
            .caught(function(err) {
                // **TODO:** do this better
                return res.end('error in caught' + err);
            });

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
        });
    });

};


var colourful_output = function(api_name) {
    console.log('API called: '.green + api_name.blue);
};