//REQUIRED LIBRARIES
//------------------
var colors = require('colors');
var uuid = require('node-uuid');
/*var sessions = require('./../auth/sessions.js');*/

//API ENDPOINTS
//=============

module.exports = function(app) {

    //AUTHENTICATION API'S
    //====================

    //LOG IN
    //------
    app.post('/auth/login', function(req, res) {
        colourful_output('/user/listall');
        return require('./../auth/auth.login.js')(req, res);
    });

    //IS AUTHENTICATED
    //----------------
    app.get('/auth/isauthenticated', function(req, res, next) {
        colourful_output('/auth/isauthenticated');
        var isAuth = require('./../auth/auth.isAuthenticated')(req);
        return isAuth
            .then(function(data) {
                return res.end(data);
            }).caught(function(err) {
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
    app.get('/users/listall', function(req, res) {
        colourful_output('/user/listall');
        return require('./../users/users.listall.js')(res);
    });

    app.post('/user/add', function(req, res) {
        colourful_output('/user/add');
        require('../users/user.add.js')(req, res);
    });


};


var colourful_output = function(api_name) {
    console.log('API called: '.green + api_name.blue);
};