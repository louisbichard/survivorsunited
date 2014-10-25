// ENDPOINT /events/listall
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

    var event_id = GET_params.id;

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

        //RETRIEVE ALL WATCHERS
        return collection.findAsync(

            //FIND EVENT BY PASSED IT
            {
                _id: event_id
            },

            //JUST RETRIEVE WATCHER
            {
                watchers: true,
            });
    };

    var extractWatchers = function(result) {

        var find = Promise.promisifyAll(result);
        return find.toArrayAsync()
            .then(function(records) {
                return records[0].watchers;
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