//USERS API
//------------------
// ENDPOINT /user/...

//REQUIRED LIBRARIES
//------------------
var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');

module.exports = function() {

    return MongoClient.connectAsync(database.connection)
        .then(get_user_db)
        .then(send_result)
        .then(JSON.stringify)
        .caught(function() {
            console.log('Error adding record in database');
        });

};

var get_user_db = function(db) {
    var collection = Promise.promisifyAll(db.collection('users'));
    return Promise.props({
        find: collection.findAsync(),
        count: collection.countAsync()
    });
};

var send_result = function(result) {

    var find = Promise.promisifyAll(result.find);
    return find.toArrayAsync()
        .then(function(records) {
            return {
                success: true,
                count: result.count,
                result: records
            };
        });

};

