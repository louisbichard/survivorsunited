//USERS API
//------------------
// ENDPOINT /user/...

//REQUIRED LIBRARIES
//------------------
var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
//var db_connection = require('./../utilities/database.js');

module.exports = function() {
    // Connect to the db

    return MongoClient.connectAsync("mongodb://localhost:27017/su")
    .then(function(db) {
        var collection = Promise.promisifyAll(db.collection('users'));
        return collection.findAsync().then(function(result) {
            Promise.promisifyAll(result);
            return result.toArrayAsync()
                .then(function(row) {
                    return JSON.stringify(row);
                });
        });
    }).caught(function() {
        return "error in caught";
    });
};