var test_endpoint = "/task/add";

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

log.test.hasTODO();

// CURRENT
// TEST THAT IT REJECTS WITHOUT REQUIRED FIELDS
// TESTS THAT IT ADDS THE TASK STATUS FIELD 
// TEST THAT IT REJECTS ANON (OTHER FILE)
// TEST THAT IT ADDS ALL THE FIELDS THAT ARE REQUIRED

// SETUP
setup_db(
    [
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
)

// DESCRIBE
.then(function() {
    log.test.describe('Accepts events with title');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .post(test_endpoint, {
                title: 'An event title',
                start: 'some unix date stamp',
                end: 'some unix date stamp',
                price: 'some example price',
                description: 'some description'
            })
            .before('setAuth', utilities.setAuthCookie)
            .expect(200)
            .expect('Expect success to be true', utilities.successIsTrue)
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