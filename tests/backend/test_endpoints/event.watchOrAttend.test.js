var test_endpoint = "/events/watchOrAttend";

var log = require('../../../backend/utilities/logger.js');
log.test.endpoint(test_endpoint);

var Promise = require('bluebird');
var assert = require('assert');
var utilities = require('../test_utilities/test_utilities.js');
var setup_db = require('../test_utilities/setup.database.js');
var clean_db = require('../test_utilities/clear.database.js');
var _ = require('lodash');
var APIeasy = require('api-easy');
var suite = APIeasy.describe(test_endpoint);


// TODO: 
// 
// EVENT NOT FOUND
// PREVENT NON AUTHENTICATED ACCESSING
// 

log.test.hasTODO();

// CURRENT:
// 
// REJECTS REQUESTS TO WATCH EVENT WITH NO ID
// VALIDATES INCORRECT EVENT IDs
// REJECTS REQUESTS WITH AN INCORRECT TYPE PARAMETER
// REJECTS REQUESTS WITH NO TYPE PARAMETER
// ACCEPTS VALID ATTENDING
// ACCEPTS VALID WATCHING
//  

//SETUP
setup_db()

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
            .expect(
                'Error message for not passing parameters',
                _.partialRight(utilities.hasErrorMessage, 'No event ID passed')
            )
            .next();

        _.delay(resolve, utilities.DELAY);

    });
})

//SETUP
.then(setup_db)

//DESCRIBE
.then(function() {
    log.test.describe('Validates incorrect event IDs');
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
            .expect(
                'Event ID to be valid',
                _.partialRight(utilities.hasErrorMessage, 'event ID was not valid')
            )
            .next();

        _.delay(resolve, utilities.DELAY);

    });
})

// SETUP
.then(function() {
    return setup_db(
        [
            // STUB OUT FAKE EVENT
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
    log.test.describe('Rejects subscription for event with an incorrect type parameter');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .post(test_endpoint, {
                id: utilities.dummy_id.EVENT_ID,
                type: utilities.dummy_id.FAKE
            })
            .expect(200)
            .before('setAuth', utilities.setAuthCookie)
            .expect('Success Is False', utilities.successIsFalse)
            .expect(
                'Gets event type is invalid message',
                _.partialRight(utilities.hasErrorMessage, 'Event type not specified or invalid')
            )
            .next();

        _.delay(resolve, utilities.DELAY);

    });
})

// SETUP
.then(function() {
    return setup_db(
        [
            // STUB OUT FAKE EVENT
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
    log.test.describe('Rejects subscription for event with no type parameter');
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
            .expect('Success Is False', utilities.successIsFalse)
            .expect('Gets error message that type is invalid', function(err, res, body) {
                utilities.hasErrorMessage(err, res, body, 'Event type not specified or invalid');
            })
            .next();

        _.delay(resolve, utilities.DELAY);

    });
})


// SETUP
.then(function() {
    return setup_db(
        [
            // STUB OUT FAKE EVENT
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
    log.test.describe('Accepts attending event');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .post(test_endpoint, {
                id: utilities.dummy_id.EVENT_ID,
                type: 'attending'
            })
            .expect(200)
            .before('setAuth', utilities.setAuthCookie)
            .expect('Success Is False', utilities.successIsTrue)
            .expect('Gets success message for subscription', function(err, res, body) {
                utilities.hasSuccessMessage(err, res, body, 'You are now attending the event');
            })
            .next();

        _.delay(resolve, utilities.DELAY);

    });
})


// SETUP
.then(function() {
    return setup_db(
        [
            // STUB OUT FAKE EVENT
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
                id: utilities.dummy_id.EVENT_ID,
                type: 'watching'
            })
            .expect(200)
            .before('setAuth', utilities.setAuthCookie)
            .expect('Success Is False', utilities.successIsTrue)
            .expect('Gets success message for subscription', function(err, res, body) {
                utilities.hasSuccessMessage(err, res, body, 'You are now watching the event');
            })
            .export(module);

        _.delay(resolve, utilities.DELAY);

    });
})

// EXIT
.then(process.exit)

// CATCH ERRORS
.caught(function(err) {
    log.debug('err', err);
    log.test.failed(test_endpoint, err);

    //EXIT REGARDLESS
    process.exit();
});