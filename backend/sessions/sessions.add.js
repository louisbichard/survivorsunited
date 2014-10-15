//USERS API
//------------------
// ENDPOINT /user/...

//REQUIRED LIBRARIES
//------------------
var Promise = require('bluebird');
var database = require('../utilities/database.js');
var uuid = require('node-uuid');
var session_id = uuid.v4();
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var _ = require('lodash');

module.exports = function(req, res) {

    return MongoClient.connectAsync(database.connection)
        .then(insertIntoDB)
        .then(function(){
            setCookie(req, res);
        })
        .caught(function(err) {
            console.log('Failed to set sessions (' + err + ')');
        });
};

var insertIntoDB = function(db) {
    var collection = Promise.promisifyAll(db.collection('sessions'));
    var record_to_insert = {
        session_id: session_id
    };

    return Promise.props({
        raw_db_results: collection.insertAsync(record_to_insert),
        count: collection.countAsync()
    });
};

var setCookie = function(req, res) {

    console.log('Setting user session');

    res.cookie('auth', session_id, {
        httpOnly: true,
        maxAge: 900000
    });

};