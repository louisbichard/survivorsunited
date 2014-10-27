var test_endpoint = "/events/listall";

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
    log.test.describe('Lists all events');
})

// SETUP
.then(function() {
    return setup_db(
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
    );
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .get(test_endpoint)
            .expect(200)
            .expect('Has result array', function(err, res, body, val, type) {
                utilities.hasResultProperty(err, res, body, 'result', 'object');
            })
            .before('setAuth', utilities.setAuthCookie)
            .expect('Has count value', function(err, res, body, val, type) {
                utilities.hasResultProperty(err, res, body, 'count', 'number');
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