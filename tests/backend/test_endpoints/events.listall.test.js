var test_endpoint = "/events/listall";

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

// SETUP
// 
log.test.hasTODO();
// TEST THAT ATTENDING AND WATCHING PROPS ARE ADDED
// TEST THAT CAN DELETE PROP IS ADDED FOR ADMINS AND EVENT CREATORS
// TEST THAT DELETE PROP IS NOT PRESENT FOR OTHER USERS OF THE SYSTEM

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
        },

        {
            collection: "events",
            data: {
                _id: utilities.dummy_id.EVENT_ID,
                title: "blah"
            }
        }

    ]
)

// DESCRIBE
.then(function() {
    log.test.describe('Lists all events');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .get(test_endpoint)
            .expect(200)
            .expect('Has a result array', _.partialRight(utilities.propertyHasLength, 'result', 1))
            .before('setAuth', utilities.setAuthCookie)
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