// ENDPOINT /events/listall


// TODO:
// 1) TEST IT DOESNT FAIL IF THE USER ISNT AUTHENTICATED
// 

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');
var log = require('../utilities/logger.js');
var _ = require('lodash');
var utility_general = require('../utilities/utilities.general.js');
var utility_date = require('../utilities/utilities.dates.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    respond.rejectAnon();

    var find_data = function(db) {

        var collection = Promise.promisifyAll(db.collection('events'));
        return collection.findAsync();
    };

    var formatRecords = function(events) {
        events = format_dates(events);
        events = updateFieldsAttendingWatching(events);
        return events;
    };

    var format_dates = function(events) {
        return _.map(events, function(record) {
            if (record.date_created) {
                record.date_created = utility_date.unixToReadable(record.date_created);
            }
            return record;
        });
    };

    //UPDATE THE API RESPONSE WITH WHETHER THE USER IS ALREADY WATCHING OR ATTENDING AN EVENT
    var updateFieldsAttendingWatching = function(records) {
        return _.map(records, function(rec) {

            //CONVERT ALL VALUES TO STRING
            rec.attending = _.map(rec.attending, function(val) {
                return val.toString();
            });

            rec.watching = _.map(rec.watching, function(val) {
                return val.toString();
            });

            rec.user_is_attending = utility_general.inArray(rec.attending, req.user._id.toString());
            rec.user_is_watching = utility_general.inArray(rec.watching, req.user._id.toString());
            return rec;
        });
    };

    var extract_events = function(result) {
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
        .then(extract_events)
        .then(send_response)
        .caught(function(err) {
            respond.failure('Could not list events', err);
        });

};