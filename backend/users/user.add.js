//USERS API
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
        return_result({
            success: false,
            error: "no username or password specified"
        });
    }

    //VALIDATION
    //-------------------------------------------------
    // Password insufficient complexity
    if (post_params.password.length < 5) {
        return_result({
            success: false,
            error: "Password must be more than 5 characters"
        });
    }

    return MongoClient.connectAsync(database.connection)
        .then(function(db) {
            user_database = db;
        })
        .then(find_data)
        .then(check_if_user_exists)
        .then(add_record)
        .then(JSON.stringify)
        .then(return_result)
        .caught(function(err) {
            console.log('Error adding record in database: (' + err + ")");
        });
};

var find_data = function() {
    var collection = Promise.promisifyAll(user_database.collection('users'));
    return collection.findAsync({
        username: post_params.username
    });
};

var add_record = function(database) {
    var collection = Promise.promisifyAll(user_database.collection('users'));
    return collection.insertAsync({
        username: post_params.username,
        password: post_params.password
    }).then(function(result) {
        return {
            success: true,
            result: "user added to the DB"
        };
    }).caught(function(err) {
        return_result({
            success: true,
            result: "user added to the DB"
        });
    });
};



var check_if_user_exists = function(result) {
    var find = Promise.promisifyAll(result);
    return find.toArrayAsync()
        .then(function(records) {

            //VALIDATION
            //-------------------------------------------------
            // Password insufficient complexity
            if (records.length > 0) {
                return_result({
                    success: false,
                    error: "Username exists"
                });
            } else {
                return {
                    success: true,
                    result: records
                };
            }
        });
};

var return_result = function(result) {
    res.end(JSON.stringify({
        success: true,
        result: result
    }));
};