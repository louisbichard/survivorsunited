var test_endpoint = "/events/add";

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

// TODO
// 
// REJECTS ANON
// 

log.test.hasTODO();

// CURRENT
//
// REJECTS REQUEST WITH NO TITLE FIELD
// ACCEPTS WITH VALID EVENT TITLE 

// CLEAN
clean_db()

// DESCRIBE
.then(function() {
    log.test.describe('Rejects no title field');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .post(test_endpoint)
            .expect(200)
            .expect('Expect success to be false', utilities.successIsFalse)
            .expect('Event ID to be valid', function(err, res, body) {
                utilities.hasErrorMessage(err, res, body, 'No title field specified');
            })
            .next();

        _.delay(resolve, utilities.DELAY);

    });
})

.then(clean_db)

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
                date: 'some unix date stamp',
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