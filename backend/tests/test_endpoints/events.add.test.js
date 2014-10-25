var test_endpoint = "/events/add";

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
    log.test.describe('Rejects events without title, date, price and description');
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

// DESCRIBE
.then(function() {
    log.test.endpoint(test_endpoint);
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