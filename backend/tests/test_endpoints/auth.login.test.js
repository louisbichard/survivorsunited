var test_endpoint = '/auth/login';

var Promise = require('bluebird');
var assert = require('assert');
var utilities = require('../test_utilities/test_utilities.js');
var setup_db = require('../test_utilities/setup.database.js');
var clean_db = require('../test_utilities/clear.database.js');
var log = require('../../utilities/logger.js');
var _ = require('lodash');
var APIeasy = require('api-easy');
var suite = APIeasy.describe(test_endpoint);

// CLEAN
clean_db()

// DESCRIBE
.then(function() {
    log.test.endpoint(test_endpoint);
    log.test.describe('Logging in with invalid params');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite.discuss('When authenticating')
            .discuss('with no username or password')
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .post(test_endpoint)
            .expect(200)
            .expect('Success is false', utilities.successIsFalse)
            .expect('Validates no username or password', function(err, res, body) {
                utilities.hasErrorMessage(err, res, body, 'No username or password specified');
            })
            .next();

        _.delay(resolve, utilities.DELAY);

    });
})

//CLEAN
.then(clean_db)
/*
// DESCRIBE
.then(function(data) {
    log.test.describe('Logging in without password');
})

// RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite.discuss('When authenticating')
            .discuss('with username and password')
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .post(test_endpoint, {
                username: "username"
            })
            .expect(200)
            .expect('Success is true', utilities.successisFalse)
            .next();

        _.delay(resolve, utilities.DELAY);

    });
})

// CLEAN
.then(clean_db)
*/
// SETUP
.then(function() {
    return setup_db(
        [{
            collection: "users",
            data: {
                username: "username",
                password: "password"
            }
        }, {
            collection: "sessions",
            data: {
                _id: utilities.getAuthCookie(),
                user_id: false
            }
        }]
    );
})

// DESCRIBE
.then(function(data) {
    log.test.describe('Logging in with valid user');
})

// RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite.discuss('When authenticating')
            .discuss('with username and password')
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .post(test_endpoint, {
                username: "username",
                password: "password"
            })
            .before('setAuth', utilities.setAuthCookie)
            .expect(200)
            .expect('Success is true', utilities.successIsTrue)
            .expect('Success message is correct', function(err, res, body) {
                utilities.hasSuccessMessage(err, res, body, 'User logged in successfully');
            })
            .export(module);

        _.delay(resolve, utilities.DELAY);

    });
})

// EXIT
.then(process.exit)

// CATCH ERRORS
.caught(function(err) {
    log.testFailed(test_endpoint, err);

    //EXIT REGARDLESS
    process.exit();
});