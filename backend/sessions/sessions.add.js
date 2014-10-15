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
var req;
var res;

module.exports = function(request, result) {
    req = request;
    res = result;

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

    console.log(session_id);

    var collection = Promise.promisifyAll(db.collection('sessions'));
    var record_to_insert = {
        _id: session_id
    };

    return collection.insertAsync(record_to_insert);
};

var setCookie = function(req, res) {

    console.log('Setting user session');

    res.cookie('auth', session_id, {
        httpOnly: true
    });

};