//USERS API
//------------------
// ENDPOINT /user/...

//REQUIRED LIBRARIES
//------------------
var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');
var res = {};

module.exports = function(result) {
    res = result;

    return MongoClient.connectAsync(database.connection)
        .then(get_user_db)
        .then(send_result)
        .then(JSON.stringify)
        .caught(function(err) {
            res.end(JSON.stringify({
                success: false,
                error_messsage: "An error occurred when listing all users"
            }));
            console.log('Error adding record in database' + err);
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
            res.end(JSON.stringify({
                success: true,
                count: result.count,
                result: records
            }));
        });

};

