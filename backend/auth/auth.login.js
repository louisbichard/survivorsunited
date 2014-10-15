//LOGIN API
//------------------
// ENDPOINT /user/...

//REQUIRED LIBRARIES
//------------------
var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');

//SETUP PARAMETERS
//------------------
var post_params = {};
var req = {};
var res = {};
var user_database = {};

module.exports = function(request, result) {
    req = request;
    res = result;
    post_params = req.body || {};

    //VALIDATION
    //-------------------------------------------------
    // Username and Password must be present
    if (!post_params.username || !post_params.password) {
        res.end(JSON.stringify({
            success: false,
            error_message: "No username or password specified"
        }));
    }

    //VALIDATION
    //-------------------------------------------------
    // Password insufficient complexity
    if (post_params.password.length < 5) {
        res.end(JSON.stringify({
            success: false,
            error_message: "Password must be more than 5 characters"
        }));
    }

    //VALIDATION
    //-------------------------------------------------
    // User has no session to bind to user
    if (!req.cookies.auth) {
        res.end(JSON.stringify({
            success: false,
            error_message: "User has no session"
        }));
    }

    return MongoClient.connectAsync(database.connection)
        .then(function(db) {
            user_database = db;
        })
        .then(find_data)
        .then(check_if_user_exists)
        .then(bind_user_id_to_session)
        .then(JSON.stringify)
        .then(function(result) {
            res.end(result);
        })
        .caught(function(err) {
            res.end(JSON.stringify({
                success: false,
                result: "Something went wrong when logging in"
            }));
            console.log('Error logging in: (' + err + ")");
        });
};

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
    return collection.updateAsync({
        session_id: req.cookies.auth
    }, {
        $set: {
            user_id: current_user._id
        }
    }).then(function(result) {
        return {
            success: true,
            result: "Logged in successfully"
        };
    }).caught(function(err) {
        console.log(err);
        res.end(JSON.stringify({
            success: false,
            result: "Something went wrong when logging in"
        }));
    });
};

var check_if_user_exists = function(result) {
    var find = Promise.promisifyAll(result);
    return find.toArrayAsync()
        .then(function(records) {
            var current_user = records[0];

            //VALIDATION
            //-------------------------------------------------
            // No users found for username
            if (records.length < 1) {

                res.end(JSON.stringify({
                    success: false,
                    error_message: "Username does not exist"
                }));


            }

            //VALIDATION
            //-------------------------------------------------
            // Duplicate users exist
            else if (records.length > 1) {

                res.end(JSON.stringify({
                    success: false,
                    error_message: "Duplicate users with username"
                }));

            }

            //VALIDATION
            //-------------------------------------------------
            // Password doesn't match
            else if (current_user.password !== post_params.password) {

                res.end(JSON.stringify({
                    success: false,
                    error_message: "Password is incorrect"
                }));
            }

            // USER FOUND SUCCESSFULLY
            else {

                return current_user;
            }


        });

    //VALIDATION
    //-------------------------------------------------
    // Password insufficient complexity

};