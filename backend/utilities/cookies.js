var add_session = require('../sessions/sessions.add.js');
var Promise = require('bluebird');

module.exports = function(app) {

    app.all('*', function(req, res, next) {
        console.log('session of user:' + req.cookies.auth);
        var auth_cookie = req.cookies.auth;

        if (auth_cookie === undefined) {
            add_session(req, res)
                .then(function() {
                    next();
                })
                .caught(function() {
                    console.log('Error in writing cookie! (cookie.js:12)');
                });
        } else {

            require('../users/user.bindUserToRequest.js')(req, res, auth_cookie)
                .then(next)
                .caught(function() {
                    //TODO: REPLACE WITH VERBOSE COLOURED OUTPUT
                    console.log('Error in writing cookie! (cookie.js:12)');
                });
        }
    });


};