//USERS API
//------------------
// ENDPOINT /auth/isAuthenticated

//REQUIRED LIBRARIES
//------------------
var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');
var req = {};
var res = {};

module.exports = function(request, result) {
    req = request;
    res = result;

    var current_session_id = req.cookies.auth;

    // If nothing found in the node request, then return as such
    if (current_session_id === undefined) {
        return Promise.resolve(JSON.stringify({
            success: true,
            is_authenticated: false
        }));
    }

    return MongoClient.connectAsync(database.connection)
        .then(function(db) {
            return findSessionInDB(db, current_session_id);
        })
        .then(JSON.stringify)
        .caught(function() {
            res.end(JSON.stringify({
                success: false,
                error_message: "Could not find session"
            }));
            console.log('Error finding authentication record in database (auth.isAuthenticated.js)');
        });

};


var findSessionInDB = function(db, current_session_id) {

    var collection = Promise.promisifyAll(db.collection('sessions'));
    return collection.findAsync({
            _id: current_session_id
        })
        .then(function(result) {
            var find = Promise.promisifyAll(result);
            return find
                .toArrayAsync()
                .then(send_result);
        }).caught(function() {
            res.end(JSON.stringify({
                success: false,
                error_message: "Could not find session to check authentication"
            }));
            console.log('error creating result for is authenticated (auth.isAuthenticated.js)');
        });
};


var send_result = function(records) {
    res.end(JSON.stringify({
        success: true,
        is_authenticated: !!records[0].user_name
    }));
};