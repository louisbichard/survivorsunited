// ENDPOINT /events/listall

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');
var utilities_general = require('../utilities/utilities.general.js');
var log = require('../utilities/logger.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    // ONLY ALLOW AUTHENTICATED USERS
    respond.rejectAnon();

    var POST_params = req.body;
    var event_id;

    // CAREFULLY CONVERT TO ID
    try {
        event_id = database.getObjectID(POST_params.id);
    } catch (err) {
        respond.failure('event ID was not valid', err);
    }

    // VALIDATION
    if (!POST_params.id) {
        respond.failure('No event ID passed');
    }

    var type = POST_params.type;
    var a_valid_event_type = utilities_general.inArray(['attending', 'watching'], type);

    // VALIDATE TYPE, MUST BE WATCHERS OR ATTENDING
    if (!type || !a_valid_event_type) {
        respond.failure('Event type not specified or invalid');
    }

    // SET FIELDS TO RETRIEVE FROM EVENTS COLLECTION AS THE TYPE SPECIFIED IN THE POST
    var events_props_to_get = {};

    if (req.user) {
        events_props_to_get[type] = req.user._id;
    }

    var find_data = function(db) {

        var collection = Promise.promisifyAll(db.collection('events'));
        return collection.updateAsync({
            _id: database.getObjectID(event_id)
        }, {
            $addToSet: events_props_to_get
        });
    };

    var send_response = function(vals) {
        var num_rows_changed = vals[0];

        if (num_rows_changed === 0) {
            respond.failure('Event not found');
        }

        respond.success('You are now ' + type + ' the event');
    };


    return MongoClient.connectAsync(database.connection)
        .then(find_data)
        .then(send_response)
        .caught(function(err) {
            respond.failure('Could not add user as attending event', err);
        });

};