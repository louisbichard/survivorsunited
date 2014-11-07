// ENDPOINT /sessions/listall

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');
var log = require('../utilities/logger.js');
var _ = require('lodash');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    //VALIDATE THAT USER IS AUTHENTICATED
    respond.rejectAnon();

    var post_params = req.body || {};

    if(!post_params.user_id) {
        respond.failure('No user ID passed');
    }

    var user_id;

    try {
        user_id = database.getObjectID(post_params.user_id || req.user._id || "");
    } catch (e) {
        //SET USER_ID to 
        user_id = false;
    }

    //VALIDATION: Make sure there is more info than just ID
    if (Object.keys(post_params).length === 0) {
        respond.failure('No data passed for updating user');
    }

    //VALIDATION: Make sure there is more info than just ID
    if (Object.keys(post_params).length === 0) {
        respond.failure('No data passed for updating user');
    }

    var prepareData = function(db) {

        post_params = _.omit(post_params, ['id', '_id', 'user_id']);

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
            _id: user_id
        }, {
            $set: post_params
        });
    };

    var extract_sessions = function(result) {

        return result;
    };

    var objectKeysToString = function(object) {
        return Object.keys(object).join(', ');
    };

    var send_response = function() {
        var changed_field_names = "Updated user details for: " + objectKeysToString(post_params);
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