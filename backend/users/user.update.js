// ENDPOINT /sessions/listall

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');
var _ = require('bluebird');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var post_params = req.body;
    var user_id = post_params.id || req.user._id;

    //VALIDATION: Make sure there is more info than just ID
    if (Object.keys(post_params).length === 0 ) {
        respond.failure('No data passed for updating user');
    }

    var prepareData = function(db) {
        var data_to_insert = {};

        return {
            db: db,
            data_to_insert: data_to_insert
        };
    };

    try {
        database.getObjectID(post_params.id);
    } catch (err) {
        respond.failure('ID of incorrect format', err);
    }

    var find_data = function(result) {
        var db = result.db;

        var collection = Promise.promisifyAll(db.collection('users'));
        return collection.updateAsync({
            _id: database.getObjectID(user_id)
        }, {
            $set: post_params
        });
    };

    var extract_sessions = function(result) {

        return result;
    };

    var objectKeysToString = function(object) {

        return Object.keys(object).join(' <br> ');
    };

    var send_response = function() {
        var changed_field_names = objectKeysToString(post_params);
        respond.success(changed_field_names);
    };


    return MongoClient.connectAsync(database.connection)
        .then(prepareData)
        .then(find_data)
        .then(extract_sessions)
        .then(send_response)
        .caught(function(err) {
            respond.failure('Could not update user', err);
        });

};