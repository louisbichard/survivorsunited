var test_endpoint = "/sessions/listall";

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

// CLEAN
setup_db()

// DESCRIBE
.then(function() {
    log.test.describe('Lists all sessions');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .get(test_endpoint)
            .expect(200)
            .expect('Has appropriate properties', utilities.hasAppropriateProperties)
            .expect('Has result array', function(err, res, body, val, type) {
                utilities.hasResultProperty(err, res, body, 'result', 'object');
            })
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