var test_endpoint = '/users/listall';

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

//SETUP
setup_db()

//DESCRIBE
.then(function() {
    log.test.describe('Listing all users');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .get('/users/listall')
            .expect(200)
            .expect('Has array of users', _.partialRight(utilities.hasAppropriateProperties))
            .export(module);

        _.delay(resolve, utilities.DELAY);

    });
})

// END PROCESS
.then(process.exit)

//CATCH ERRORS
.caught(function(err) {
    log.testFailed(test_endpoint, err);
    process.exit();
});