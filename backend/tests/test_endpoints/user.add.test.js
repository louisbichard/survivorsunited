var test_endpoint = "/user/add";

var APIeasy = require('api-easy');
var assert = require('assert');
var test_user = "test_user" + new Date().getTime() + "@test.com";
var utilities = require('../test_utilities/test_utilities.js');
var suite = APIeasy.describe('your/awesome/api');
var log = require('../../utilities/logger.js');

log.test.endpoint(test_endpoint);

// TEST WITHOUT USERNAME & PASSWORD
log.test.describe('adding a user without credentials');
suite
    .use('localhost', 3000)
    .setHeader('Content-Type', 'application/json')
    .post(test_endpoint, {})
    .expect(200)
    .expect('Has appropriate properties', utilities.hasAppropriateProperties)
    .export(module);

// TEST WITHOUT USERNAME
log.test.describe('adding a user without a username');
suite
    .use('localhost', 3000)
    .setHeader('Content-Type', 'application/json')
    .post(test_endpoint, {
        password: "password"
    })
    .expect(200)
    .expect('Has appropriate properties', utilities.hasAppropriateProperties)
    .export(module);


// TEST WITH LESS THAN 5 CHARACTER PASSWORD


// ADDS RANDOM USER


// CANNOT ADD USER PREVIOUSLY ADDED
