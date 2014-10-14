var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;

module.exports = function(table) {
    return MongoClient.connectAsync("mongodb://localhost:27017/su")
        .then(function(db) {
            var collection = Promise.promisifyAll(db.collection(table));
            return collection.findAsync().then(function(result) {
                Promise.promisifyAll(result);
                return result.toArrayAsync()
                .then(function(records) {
                    return {
                        success: true,
                        result: records
                    };
                });
            });
        })
        .then(JSON.stringify);
};