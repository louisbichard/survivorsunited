var test_endpoint = "events/watching/current";

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

// SETUP
.then(function() {
    return setup_db(
        [
            //STUB OUT USERS
            {
                collection: "users",
                data: {
                    _id: utilities.dummy_id.USER_ID,
                    username: "username",
                    password: "password"
                }
            },

            // STUB OUT SESSIONS
            {
                collection: "sessions",
                data: {
                    _id: utilities.getAuthCookie(),
                    user_id: utilities.dummy_id.USER_ID
                }
            },

            //STUB OUT SESSIONS
            {
                collection: "events",
                data: {
                    title: "some event",
                    description: "some testing event",
                    date: "some_date",
                    price: "price",
                    watchers: [utilities.dummy_id.USER_ID]
                }
            }
        ]
    );
})

// DESCRIBE
.then(function() {
    log.test.describe('Requesting users watched events returns 1 and only 1');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .get(test_endpoint)
            .before('setAuth', utilities.setAuthCookie)
            .expect(200)
            .expect('is Successful', utilities.successIsTrue)
            .expect('Has result array', function(err, res, body) {
                utilities.hasResultProperty(err, res, body, 'result', 'object');
            })
            .expect('Has result array of 1 value', function(err, res, body) {
                utilities.propertyHasLength(err, res, body, 'result.result', 1);
            })
            .export(module);

        _.delay(resolve, utilities.DELAY);

    });
})

// EXIT TEST
.then(process.exit)

// CATCH ERRORS
.caught(function(err) {
    log.debug('err', err);
    log.test.failed(test_endpoint, err);

    //EXIT REGARDLESS
    process.exit();
});