// ENDPOINT /auth/login

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb"))
    .MongoClient;
var database = require('../utilities/database.js');
var log = require('../utilities/logger.js');

//CUSTOM PARAMETERS
var post_params = {};

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    post_params = req.body || {};
    var current_user;

    var validate_credentials = function(records) {
        current_user = records[0];

        // VALIDATION: No users found for username
        if (records.length < 1) respond.failure('Username does not exist');

        // VALIDATION: Duplicate users exist
        // TODO: ENSURE THIS ISNT POSSIBLE
        else if (records.length > 1) respond.failure('Duplicate users with username');

        // VALIDATION: Password doesn't match
        else if (current_user.password !== post_params.password) respond.failure('Password is incorrect');

        // USER FOUND SUCCESSFULLY
        else return current_user;

    };

    var updateCurrentSession = function() {
        return database.update('sessions', [{
            _id: o_id
        }, {
            $set: {
                user_id: current_user._id
            }
        }]);
    };

    var checkSessionUpdatedCorrectly = function(result) {
        if (result[1].n === 0) respond.failure('Login failed', 'Session not found');
        else respond.success('User logged in successfully');
    };

    //VALIDATION: Username and Password must be present
    if (!post_params.username || !post_params.password) respond.failure('No username or password specified');

    //VALIDATION: Password insufficient complexity
    else if (post_params.username && post_params.password && post_params.password.length < 5) respond.failure('Password must be more than 5 characters');

    //VALIDATION: User has no session to bind to user
    else if (!req.cookies.auth) respond.failure('User doesnt have session');

    else {
        var o_id = database.getObjectID(req.cookies.auth);

        return database.find('users', [{
                username: post_params.username,
                password: post_params.password
            }])
            .then(validate_credentials)
            .then(updateCurrentSession)
            .then(checkSessionUpdatedCorrectly)
            .caught(function(err) {
                log.debug(err);
                respond.failure('Error authenticating user', err);
            });
    }

};