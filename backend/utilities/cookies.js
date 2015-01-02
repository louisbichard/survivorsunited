var add_session = require('../sessions/sessions.add.js');
var Promise = require('bluebird');
var log = require('../utilities/logger.js');
var database = require('../utilities/database.js');

module.exports = function(app) {

    app.all('*', function(req, res, next) {
        var respond = require('../utilities/utilities.respond.js')({
            req: req,
            res: res,
            file: __dirname + __filename
        });
        var auth_cookie = req.cookies.auth;

        var getuser = function(user_id) {

            return database.find('users', [{
                _id: database.getObjectID(user_id)
            }]).then(function(result) {
                return result[0];
            });
        };

        //IF THEY HAVE COOKIE
        if (auth_cookie !== undefined) {
            database.find('sessions', [{
                    _id: database.getObjectID(auth_cookie)
                }])
                .then(function(result) {
                    // BIND USER TO REQUEST
                    return result[0] && result[0].user_id !== false ? getuser(result[0].user_id) : Promise.resolve(false);
                }).then(function(user) {
                    req.user = user;
                    next();
                });
        }

        //IF THEY DON'T HAVE COOKIE
        else {
            database.insert('sessions', [{
                    user_id: false
                }])
                .then(function(result) {
                    //SET NEW COOKIE AS THE DB ID
                    res.cookie('auth', result[0]._id, {
                        httpOnly: true
                    });
                    next();
                })
                .caught(function(err) {
                    respond.generalFailure(err);
                });
        }
    });
};