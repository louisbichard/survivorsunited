var test_endpoint = "/user/update";

var log = require('../../../backend/utilities/logger.js');
log.test.endpoint(test_endpoint);

var Promise = require('bluebird');
var APIeasy = require('api-easy');
var suite = APIeasy.describe(test_endpoint);
var assert = require('assert');
var utilities = require('../test_utilities/test_utilities.js');
var setup_db = require('../test_utilities/setup.database.js');
var clean_db = require('../test_utilities/clear.database.js');

var _ = require('lodash');

// TODO: 
// TEST THAT IT OMITS THE ID WHEN PASSED IN 
// TEST THAT IT OMITS _id WHEN PASSED IN
// ALSO, MAKE SURE THAT THE ID MUST BE PASSED MORE SAFELY, OTHERWISE ITS GOING TO OVERWRITE THE CURRENT USER! (INDICATIVE OF BUGS :/)
// TEST THAT IF SOMETHING ISNT SET, THAT IT IS THEN SET

/*//SETUP
setup_db()

//DESCRIBE
.then(function() {
    log.test.describe('Validates when no details are passed');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite.discuss('When authenticating')
            .discuss('and getting all sessions')
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .post(test_endpoint)
            .expect('success to be true', utilities.successIsFalse)
            .expect('Error message to be set', function(err, res, body) {
                log.debug(body);
                //utilities.hasErrorMessage(err, res, body, 'User is not authenticated');
            })
            .expect(200)
            .next();

        _.delay(resolve, utilities.DELAY);

    });
})

*/
// SETUP

setup_db(
        [
            //STUB OUT USERS
            {
                collection: "users",
                data: {
                    _id: utilities.dummy_id.USER_ID,
                    username: "username",
                    password: "password",
                    mentor: utilities.dummy_id.USER_ID
                }
            },

            // STUB OUT SESSIONS
            {
                collection: "sessions",
                data: {
                    _id: utilities.getAuthCookie(),
                    user_id: utilities.dummy_id.USER_ID
                }
            }
        ]
    )

//DESCRIBE
.then(function() {
    log.test.describe('Rejects requests with no passed data');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite.discuss('When authenticating')
            .discuss('and getting all sessions')
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .before('setAuth', utilities.setAuthCookie)
            .post(test_endpoint)
            .expect('success to be true', utilities.successIsFalse)
            .expect('Error message to be set', function(err, res, body) {
                utilities.hasErrorMessage(err, res, body, 'No data passed for updating user');
            })
            .expect(200)
            .next();

        _.delay(resolve, utilities.DELAY);

    });
})

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
                    password: "password",
                    mentor: utilities.dummy_id.USER_ID
                }
            },

            // STUB OUT SESSIONS
            {
                collection: "sessions",
                data: {
                    _id: utilities.getAuthCookie(),
                    user_id: utilities.dummy_id.USER_ID
                }
            }
        ]
    );
})

//DESCRIBE
.then(function() {
    log.test.describe('Accepts requests with passed data');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite.discuss('When authenticating')
            .discuss('and getting all sessions')
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .before('setAuth', utilities.setAuthCookie)
            .post(test_endpoint, {
                something: "something"
            })
            .expect('success to be true', utilities.successIsTrue)
            .expect('Error message to be set', function(err, res, body) {
                utilities.hasSuccessMessage(err, res, body, 'Updated user details for: something');
            })
            .expect(200)
            .export(module);

        _.delay(resolve, utilities.DELAY);

    });
})

//EXIT
.then(process.exit)

//CATCH ERRORS
.caught(function(err) {
    log.testFailed(test_endpoint, err);
    process.exit();
});