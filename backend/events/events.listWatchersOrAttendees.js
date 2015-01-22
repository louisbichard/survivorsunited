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

    var event_id = GET_params.id;
    var type = GET_params.type;

    // ENSURE THAT THE EVENT TYPE IS VALID
    var a_valid_event_type = utilities_general.inArray(['attending', 'watching'], type);

    //ENSURE VALIDITY OF PASSED ID
    try {
        event_id = database.getObjectID(event_id);
    } catch (err) {
        respond.failure('ID is invalid');
    }

    //VALIDATE TYPE, MUST BE WATCHERS OR ATTENDING
    if (!type || !a_valid_event_type) {
        respond.failure('Event type not specified or invalid');
    } else {

        var event_title;
        //SET FIELDS TO RETRIEVE FROM EVENTS COLLECTION AS THE TYPE SPECIFIED IN THE GET
        var events_props_to_get = {
            title: true
        };

        events_props_to_get[type] = true;

        var getWatchers = function(user_ids) {
            return database.find('users', [{
                _id: {
                    $in: user_ids
                }
            }, {
                first_name: true,
                last_name: true,
                severity_grade: true
            }]);
        };

        var formatEventData = function(result) {
            event_title = result[0].title;
            return result[0][type];
        };

        return database.find('events', [{
                    _id: event_id
                },
                events_props_to_get
            ])
            .then(formatEventData)
            .then(getWatchers)
            .then(function(users) {
                return respond.success({
                    users: users,
                    title: event_title
                });
            })
            .caught(function() {
                respond.failure('Could not fetch events');
            });

    }

};