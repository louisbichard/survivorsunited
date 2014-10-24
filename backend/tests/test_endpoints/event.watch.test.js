var test_endpoint = "/events/watch";

var APIeasy = require('api-easy');
var assert = require('assert');
var suite = APIeasy.describe('your/awesome/api');
var utilities = require('../test_utilities/test_utilities.js');
var log = require('../../utilities/logger.js');

//TEST HEADER

log.test.endpoint(test_endpoint);

//SESSION MANAGEMENT API TESTS
//----------------------------
log.test.describe('Allows user to watch event');
suite
    .use('localhost', 3000)
    .setHeader('Content-Type', 'application/json')
    .post(test_endpoint, {})
    .expect(200)
    .expect('Has appropriate properties', utilities.hasAppropriateProperties)
    .export(module);
