var test_endpoint = "/auth/logout";

var log = require('../../utilities/logger.js');
log.test.endpoint(test_endpoint);

var Promise = require('bluebird');
var APIeasy = require('api-easy');
var suite = APIeasy.describe(test_endpoint);
var assert = require('assert');
var utilities = require('../test_utilities/test_utilities.js');
var setup_db = require('../test_utilities/setup.database.js');
var clean_db = require('../test_utilities/clear.database.js');
var _ = require('lodash');

// CLEAN  
clean_db()

//DESCRIBE
.then(function() {
    log.test.describe('Testing general logout');
})

// RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .get(test_endpoint)
            .expect(200)
            .expect('Success message is correct', function(err, res, body) {
                utilities.hasSuccessMessage(err, res, body, 'User is already logged out');
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