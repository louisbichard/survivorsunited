//INSERT INTO ALL DATABASES

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var colors = require('colors');
var _ = require('lodash');
var database = require('../../../backend/utilities/database.js');
var clean_db = require('./clear.database.js');


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
        return data;
    };

    return clean_db()
        .then(function(){
            return MongoClient.connectAsync(database.connection);
        })
        .then(getCollection)
        .then(insertData)
        .then(logIfSuccess)
        .caught(function(err) {
            console.log(err);
            throw new Error('Could not setup databases', '\n');
        });
};