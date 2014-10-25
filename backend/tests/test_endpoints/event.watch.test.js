var test_endpoint = "/events/watch";

var log = require('../../utilities/logger.js');
log.test.endpoint(test_endpoint);

var Promise = require('bluebird');
var assert = require('assert');
var utilities = require('../test_utilities/test_utilities.js');
var setup_db = require('../test_utilities/setup.database.js');
var clean_db = require('../test_utilities/clear.database.js');
var _ = require('lodash');
var APIeasy = require('api-easy');
var suite = APIeasy.describe(test_endpoint);

// CLEAN
clean_db()

// DESCRIBE
.then(function() {    
    log.test.describe('Rejects requests to watch event with no event ID');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .post(test_endpoint, {})
            .expect(200)
            .expect('SuccessIsFalse', utilities.successIsFalse)
            .expect('Error message for not passing parameters', function(err, res, body) {
                utilities.hasErrorMessage(err, res, body, 'No event ID passed');
            })
            .next();

        _.delay(resolve, utilities.DELAY);

    });
})

//CLEAN
.then(clean_db)

//DESCRIBE
.then(function() {
    log.test.describe('Validates incorrect IDs');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .post(test_endpoint, {
                id: "123123"
            })
            .expect(200)
            .expect('Success is false', utilities.successIsFalse)
            .expect('Event ID to be valid', function(err, res, body) {
                utilities.hasErrorMessage(err, res, body, 'event ID was not valid');
            })
            .next();

        _.delay(resolve, utilities.DELAY);

    });
})

//CLEAN
.then(clean_db)

// SETUP
.then(function() {
    return setup_db(
        [
            // STUB OUT FAKE SESSION
            {
                collection: "events",
                data: {
                    _id: utilities.dummy_id.EVENT_ID,
                    title: "some_event",
                    attending: []
                }
            },

            // STUB OUT FAKE SESSION
            {
                collection: "sessions",
                data: {
                    _id: utilities.getAuthCookie(),
                    user_id: utilities.dummy_id.USER_ID
                }
            },

            //STUB OUT FAKE USER
            {
                collection: "users",
                data: {
                    _id: utilities.dummy_id.USER_ID,
                    username: "somebody",
                    password: "password"
                }
            }
        ]
    );
})

// DESCRIBE
.then(function() {
    log.test.describe('Accepts subscription for event');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .post(test_endpoint, {
                id: utilities.dummy_id.EVENT_ID
            })
            .expect(200)
            .before('setAuth', utilities.setAuthCookie)
            .expect('Gets success message for subscription', function(err, res, body) {
                utilities.hasSuccessMessage(err, res, body, 'User is now watching event');
            })
            .export(module);

        _.delay(resolve, utilities.DELAY);

    });
})

//CLEAN
.then(clean_db)

// EXIT
.then(process.exit)

// CATCH ERRORS
.caught(function(err) {
    log.debug('err', err);
    log.test.failed(test_endpoint, err);

    //EXIT REGARDLESS
    process.exit();
});