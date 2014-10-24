//DESTROY ALL DATABASES

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var colors = require('colors');
var _ = require('lodash');
var database = require('../../utilities/database.js');
var log = require('../../utilities/logger.js');

var collections_to_clean = ['users', 'sessions'];

module.exports = function cleanDatabases() {
    var getCollection = function(db) {
        return _.reduce(collections_to_clean, function(prev, curr) {
            prev[curr] = Promise.promisifyAll(db.collection(curr)).removeAsync({});
            return prev;
        }, {});
    };

    var removeData = function(collection) {
        return Promise.props(collection);
    };

    var logIfSuccess = function(data) {
        log.test.databaseChange('Mock data removed');
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