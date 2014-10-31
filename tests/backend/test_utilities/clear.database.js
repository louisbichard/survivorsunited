//DESTROY ALL DATABASES

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var colors = require('colors');
var _ = require('lodash');
var database = require('../../../backend/utilities/database.js');
var log = require('../../../backend/utilities/logger.js');

var collections_to_clean = ['users', 'sessions', 'events'];

module.exports = function cleanDatabases() {

    // CONSTRUCT OBJECT OF PROMISES TO REMOVE ALL COLLECTIONS IN ARRAY
    var getCollection = function(db) {
        return _.reduce(collections_to_clean, function(prev, curr) {
            prev[curr] = Promise.promisifyAll(db.collection(curr)).removeAsync({});
            return prev;
        }, {});
    };

    // LAUNCH PROMISE OBJECTS
    var removeData = function(collection) {
        return Promise.props(collection);
    };

    // RUN IF ALL THE DATABASE REMOVALS WORK
    var logIfSuccess = function(data) {
        return data;
    };

    return MongoClient.connectAsync(database.connection)
        .then(getCollection)
        .then(removeData)
        .then(logIfSuccess)
        .caught(function(err) {
            console.log(err);
            throw new Error('Could not delete databases', '\n');
        });
};