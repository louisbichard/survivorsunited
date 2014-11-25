var mongo = require('mongodb');
var database = process.env.DATABASE;
var respond = require('../utilities/utilities.respond.js');
var Promise = require('bluebird');

if (!database) {
    throw new Error('Database environment variable is undefined!');
}

module.exports = {
    connection: "mongodb://127.0.0.1:27017/" + database,
    getObjectID: function(id) {
        return new mongo.BSONPure.ObjectID(id);
    },
    formatData: function(result) {
        var find = Promise.promisifyAll(result);
        return find.toArrayAsync()
            .then(function(tasks) {
                return tasks;
            });
    }
};