// ENDPOINT /auth/login

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');

//CUSTOM PARAMETERS
var post_params = {};
var user_database = {};

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    post_params = req.body || {};

    //VALIDATION: Username and Password must be present
    if (!post_params.username || !post_params.password) {
        respond.failure('No username or password specified');
    }

    //VALIDATION: Password insufficient complexity
    if (post_params.password.length < 5) {
        respond.failure('Password must be more than 5 characters');
    }

    //VALIDATION: User has no session to bind to user
    if (!req.cookies.auth) {
        respond.failure('User doesnt have session');
    }

    var find_data = function() {
        var collection = Promise.promisifyAll(user_database.collection('users'));
        return collection.findAsync({
            username: post_params.username
        });
    };

    var bind_user_id_to_session = function(current_user) {
        current_user = current_user || {};

        var collection = Promise.promisifyAll(user_database.collection('sessions'));



        // SET SESSION TO USER ID

        var mongo = require('mongodb');
        var BSON = mongo.BSONPure;
        var o_id = new BSON.ObjectID(req.cookies.auth);

        return collection.updateAsync({
            _id: o_id
        }, {
            $set: {
                user_id: current_user._id
            }
        }).then(function(result) {

            // CHECK RECORDS WERE ACTUALLY UPDATED
            // TODO: Probably no need to throw console error here, valid. 
            if (result[1].n === 0) {
                respond.failure('Login failed', 'No records were updated, session not found');
            } else {
                respond.success('User logged in successfully');
            }

        }).caught(function(err) {
            respond.failure('User failed to login', err);
        });
    };

    var validate_credentials = function(records) {

        var current_user = records[0];


        //VALIDATION: No users found for username
        if (records.length < 1) {
            respond.failure('Username does not exist');
        }

        //VALIDATION: Duplicate users exist
        else if (records.length > 1) {
            respond.failure('Duplicate users with username');
        }

        //VALIDATION: Password doesn't match
        else if (current_user.password !== post_params.password) {
            respond.failure('Password is incorrect');
        }

        // USER FOUND SUCCESSFULLY
        else {
            return current_user;
        }

    };

    var check_if_user_exists = function(result) {
        var find = Promise.promisifyAll(result);
        return find.toArrayAsync();
    };

    return MongoClient.connectAsync(database.connection)
        .then(function(db) {
            user_database = db;
        })
        .then(find_data)
        .then(check_if_user_exists)
        .then(validate_credentials)
        .then(bind_user_id_to_session)
        .caught(function(err) {
            respond.failure('Error authenticating user', err);
        });
};