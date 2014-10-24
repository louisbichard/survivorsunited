var test_endpoint = "/events/add";

var APIeasy = require('api-easy');
var assert = require('assert');
var suite = APIeasy.describe('your/awesome/api');
var utilities = require('../test_utilities/test_utilities.js');
var log = require('../../utilities/logger.js');

log.test.endpoint(test_endpoint);

log.test.describe('Testing general logout');

suite
    .use('localhost', 3000)
    .setHeader('Content-Type', 'application/json')
    .post(test_endpoint, {})
    .expect(200)
    .expect('Has appropriate properties', utilities.hasAppropriateProperties)
    .export(module);

log.test.describe('Accepts with title');

suite
    .use('localhost', 3000)
    .setHeader('Content-Type', 'application/json')
    .post(test_endpoint, {
        title: "test_event"
    })
    .expect(200)
    .expect('Has appropriate properties', utilities.hasAppropriateProperties)
    .export(module);