//INSERT INTO ALL DATABASES

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var colors = require('colors');
var _ = require('lodash');
var database = require('../../utilities/database.js');
var log = require('../../utilities/logger.js');

module.exports = function cleanDatabases(args) {

    _.each(args, function(curr) {
        if (!curr.data || !curr.collection) {
            throw new Error('collection and data must be provded to setup databases');
        }
    });

    var getCollection = function(db) {        
        return _.reduce(args, function(prev, curr) {
            prev[curr] = Promise.promisifyAll(db.collection(curr.collection)).insertAsync(curr.data);
            return prev;
        }, {});
    };

    var insertData = function(collection) {        
        return Promise.props(collection);
    };

    var logIfSuccess = function(data) {        
        log.test.databaseChange('Mock data inserted');
        return data;
    };

    return MongoClient.connectAsync(database.connection)
        .then(getCollection)
        .then(insertData)
        .then(logIfSuccess)
        .caught(function(err) {
            console.log(err);
            throw new Error('Could not delete databases', '\n');
        });
};