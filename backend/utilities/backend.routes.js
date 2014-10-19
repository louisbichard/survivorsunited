//REQUIRED LIBRARIES
//------------------
var colors = require('colors');
var uuid = require('node-uuid');
/*var sessions = require('./../auth/sessions.js');*/

//API ENDPOINTS
//=============

module.exports = function(app) {

    //AUTHENTICATION
    //==============
    app.post('/auth/login', function(req, res) {
        colourful_output('/auth/login');
        return require('./../auth/auth.login.js')(req, res);
    });

    app.get('/auth/logout', function(req, res) {
        colourful_output('/auth/logoutl');
        return require('./../auth/auth.logout.js')(req, res);
    });

    app.get('/auth/isauthenticated', function(req, res, next) {
        colourful_output('/auth/isauthenticated');
        var isAuth = require('./../auth/auth.isAuthenticated')(req, res);
    });

    //SESSION
    //=======
    app.get('/sessions/listall', function(req, res) {
        colourful_output('/sessions/listall');
        return require('./../sessions/sessions.listall.js')(req, res);
    });

    //USER
    //====
    app.get('/users/listall', function(req, res) {
        colourful_output('/users/listall');
        return require('./../users/users.listall.js')(req, res);
    });

    app.post('/user/update', function(req, res) {
        colourful_output('/users/update');
        return require('./../users/user.update.js')(req, res);
    });

    app.post('/user/add', function(req, res) {
        colourful_output('/user/add');
        require('../users/user.add.js')(req, res);
    });

    app.post('/user/delete', function(req, res) {
        colourful_output('/user/delete');
        require('../users/user.delete.js')(req, res);
    });


};


var colourful_output = function(api_name) {
    console.log('API called: '.green + api_name.blue);
};