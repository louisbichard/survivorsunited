//USERS API
//------------------
// ENDPOINT /auth/isAuthenticated

//REQUIRED LIBRARIES
//------------------
var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');

module.exports = function(req) {
    var current_session_id = req.cookies.auth;

    // If nothing found in the node request, then return as such
    if (current_session_id === undefined) {
        return Promise.resolve(JSON.stringify({
            success: true,
            is_authenticated: false
        }));
    }

    return MongoClient.connectAsync(database.connection)
        .then(function(db){
            return findSessionInDB(db, current_session_id);
        })
        .then(JSON.stringify)
        .caught(function() {
            console.log('Error finding authentication record in database (auth.isAuthenticated.js)');
        });

};

/** 
 * [findSessionInDB description]
 * @param  {[type]} db
 * @return {[type]}
 */
var findSessionInDB = function(db, current_session_id) {

    var collection = Promise.promisifyAll(db.collection('sessions'));
    return collection.findAsync({
            session_id: current_session_id
        })
        .then(function(result) {
            var find = Promise.promisifyAll(result);
            return find
                .toArrayAsync()
                .then(send_result);
        }).caught(function(){
            console.log('error creating result for is authenticated (auth.isAuthenticated.js)')
        });
};

/** 
 * [send_result passed in the result from the database]
 * @param  {[type]} result - the object literal result from the DB
 * @return {[type]} success/error object
 */
var send_result = function(records) {

    if (records.length > 1) {
        return {
            success: false,
            error_message: "2 session records found for 1 user",
            has_session: !!records.session_id,
            is_authenticated: !!records.user_name
        };
    }

    return {
        success: true,
        has_session: !!records[0].session_id,
        is_authenticated: !!records[0].user_name
    };
};