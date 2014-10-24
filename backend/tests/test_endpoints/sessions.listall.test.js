var test_endpoint = "/sessions/listall";

var APIeasy = require('api-easy');
var assert = require('assert');
var suite = APIeasy.describe('your/awesome/api');
var utilities = require('../test_utilities/test_utilities.js');
var log = require('../../utilities/logger.js');

log.test.endpoint(test_endpoint);
log.test.describe('Listing all users');

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
