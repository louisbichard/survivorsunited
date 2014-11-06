var test_endpoint = "/user/assign_mentor";

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

// TODO
// 
// REJECTS CALL WITH NON EXISTANT MENTOR
// ACCEPTS VALID ASSIGNMENT
// REJECTS CALL TO ANONYMOUS USER
// REJECTS CALL WITHOUT USER ID
// 

log.test.hasTODO();

//SETUP
setup_db([])

// DESCRIBE
.then(function() {
    log.test.describe('Rejects calls without mentor_id');
})

//RUN
.then(function() {
    return new Promise(function(resolve, reject) {

        suite
            .use('localhost', 3000)
            .setHeader('Content-Type', 'application/json')
            .post(test_endpoint)
            .expect(200)
            .before('setAuth', utilities.setAuthCookie)
            .expect('sucessIsTrue', utilities.successIsFalse)
            .expect('Has error message', _.partialRight(utilities.hasErrorMessage, 'No Mentor ID was sent'))
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