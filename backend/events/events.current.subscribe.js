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

    var post_params = req.body;

    //CAREFULLY CONVERT TO ID
    try {
        var event_id = database.getObjectID(post_params.id);
    } catch (err) {
        respond.failure('event ID was not valid', err);
    }

    //VALIDATION
    if (!post_params.id) {
        respond.failure('No event ID passed');
    }

    var find_data = function(db) {
        var collection = Promise.promisifyAll(db.collection('events'));
        return collection.updateAsync({
            _id: event_id
        }, {
            $addToSet: {
                attending: req.user._id
            }
        });
    };

    var send_response = function(vals) {
        var num_rows_changed = vals[0];

        if (num_rows_changed === 0) {
            respond.failure('Event not found');
        }

        respond.success('User is now attending event');
    };


    return MongoClient.connectAsync(database.connection)
        .then(find_data)
        .then(send_response)
        .caught(function(err) {
            respond.failure('Could not add user as attending event', err);
        });

};