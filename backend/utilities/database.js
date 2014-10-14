var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;

module.exports = function() {
    return MongoClient.connectAsync("mongodb://localhost:27017/su");
};