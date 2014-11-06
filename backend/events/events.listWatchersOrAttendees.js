// ENDPOINT /events/listall


// TODO: ADD TESTS 
// 
// 1) DOES NOT ACCEPT INVALID EVENT TYPES (type)
// 2) DOES NOT ACCEPT WHEN NO ID (id)
// 3) EVENT NOT FOUND
// 


var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');
var utilities_general = require('../utilities/utilities.general.js');
var log = require('../utilities/logger.js');
var _ = require('lodash');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    GET_params = utilities_general.GET_params(req);

    //GET event ID as passed as 'id'
    var event_id = GET_params.id;

    //ASSESS WHETHER WATCHER OR ATTENDEES IS REQUIRED
    var type = GET_params.type;

    var a_valid_event_type = utilities_general.inArray(['attending', 'watching'], type);

    //VALIDATE TYPE, MUST BE WATCHERS OR ATTENDING
    if (!type || !a_valid_event_type) {
        respond.failure('Event type not specified or invalid');
    }

    //SET FIELDS TO RETRIEVE FROM EVENTS COLLECTION AS THE TYPE SPECIFIED IN THE GET
    var events_props_to_get = {};
    events_props_to_get[type] = true;

    //CONVERT PASSED ID TO OBJECT ID
    try {
        event_id = database.getObjectID(event_id);
    } catch (err) {
        respond.failure('ID is invalid');
    }

    var getMongo = function() {
        return MongoClient.connectAsync(database.connection);
    };

    var findWatcherForEventID = function(db) {

        var collection = Promise.promisifyAll(db.collection('events'));

        return collection.findAsync(

            //FIND EVENT BY PASSED IT
            {
                _id: event_id
            },

            //JUST RETRIEVE WATCHER
            events_props_to_get
        );
    };

    var extractWatchers = function(result) {
            
        var find = Promise.promisifyAll(result);
        return find.toArrayAsync()
            .then(function(records) {
                if (records.length === 0) {
                    respond.failure('Event not found');
                }
                return records[0][type];
            });
    };

    var extractWatchersDetails = function(result) {
        var find = Promise.promisifyAll(result);
        return find.toArrayAsync()
            .then(function(records) {
                return records;
            });
    };


    var getUsers = function(args) {

        //PULL OUT PROPERTIES
        var db = args.db;
        var watchers = args.watchers;

        var collection = Promise.promisifyAll(db.collection('users'));

        //RETRIEVE ALL WATCHERS DETAILS
        return collection.findAsync({
            _id: {
                $in: watchers
            }
        }, {
            first_name: true,
            last_name: true
        });
    };

    var send_response = function(vals) {
        respond.success(vals);
    };


    return getMongo()
        .then(findWatcherForEventID)
        .then(extractWatchers)
        .then(function(watchers) {
            //PASS WATCHERS AND GET DB
            return Promise.props({
                db: getMongo(),
                watchers: watchers
            });
        })
        .then(getUsers)
        .then(extractWatchersDetails)
        .then(send_response)
        .caught(function(err) {
            respond.failure('Could not list watchers for event', err);
        });

};