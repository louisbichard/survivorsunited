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
        .then(function(db) {
            var collection = Promise.promisifyAll(db.collection('sessions'));
            return Promise.props({
                    find: collection.findAsync(),
                    count: collection.countAsync()
                })
                .then(function(result) {

                    var find = Promise.promisifyAll(result.find);
                    return find.toArrayAsync()
                        .then(function(records) {
                            return {
                                success: true,
                                count: result.count,
                                result: records
                            };
                        });
                });
        })
        .then(JSON.stringify)
        .caught(function() {
            console.log('Error adding record in database');
        });

};