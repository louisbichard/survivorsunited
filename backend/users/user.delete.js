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
    // No ID specified
    console.log(post_params.id);
    if (!post_params.id) {
        res.end(JSON.stringify({
            success: false,
            error_message: "no ID specified"
        }));
    }

    return MongoClient.connectAsync(database.connection)
        .then(function(db) {
            user_database = db;
        })
        .then(find_data)
        .then(delete_record)
        .caught(function(err) {
            console.log('Error adding record in database: (' + err + ")");
        });
};

var find_data = function() {
    var collection = Promise.promisifyAll(user_database.collection('users'));
    return collection.countAsync({
        username: post_params.username
    });
};

var delete_record = function(database) {
    var collection = Promise.promisifyAll(user_database.collection('users'));
    return collection.removeAsync({
        _id: post_params.id
    }).then(function(result) {

        // CHECK HOW MANY USERS WERE REMOVED
        if (result[1].n === 0) {
            res.end(JSON.stringify({
                success: false,
                result: "ID " + post_params.id +" does not match a user"
            }));
        } else {
            res.end(JSON.stringify({
                success: false,
                result: "User removed"
            }));
        }

    }).caught(function(err) {
        res.end(JSON.stringify({
            success: false,
            result: "user could not be removed from the DB"
        }));
    });
};