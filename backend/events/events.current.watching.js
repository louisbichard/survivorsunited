// ENDPOINT /events/listall
var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');
var log = require('../utilities/logger.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    //VALIDATE THAT USER ID EXISTS
    if (!req.user) {
        respond.failure('User is not authenticated');
    }

    // PERFORM AFTER VALIDATING
    var user_id;
    try {
        user_id = database.getObjectID(req.user._id);
    } catch (err) {
        respond.failure('User ID is unreadable', err);
    }

    var find_data = function(db) {

        var collection = Promise.promisifyAll(db.collection('events'));
        return collection.findAsync({
            watching: {
                $in: [user_id]
            }
        });
    };

    var extract_sessions = function(result) {
        var find = Promise.promisifyAll(result);
        return find.toArrayAsync()
            .then(function(records) {
                return records;
            });
    };

    var send_response = function(vals) {
        respond.success(vals);
    };

    return MongoClient.connectAsync(database.connection)
        .then(find_data)
        .then(extract_sessions)
        .then(send_response)
        .caught(function(err) {
            respond.failure('Could not list currently watched events!', err);
        });

};