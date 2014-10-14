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
        .then(find_data)
        .then(JSON.stringify)
        .caught(function() {
            console.log('Error adding record in database');
        });

};

var convert_array = function(result) {

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

var find_data = function(db) {

    var collection = Promise.promisifyAll(db.collection('sessions'));
    return Promise.props({
            find: collection.findAsync(),
            count: collection.countAsync()
        })
        .then(convert_array);

};