var test_endpoint = '/users/listall';

var APIeasy = require('api-easy');
var assert = require('assert');
var test_user = "test_user" + new Date().getTime() + "@test.com";
var utilities = require('../test_utilities/test_utilities.js');
var suite = APIeasy.describe('your/awesome/api');
var log = require('../../utilities/logger.js');

log.test.endpoint(test_endpoint);

log.test.describe('Listing all users');
suite
    .use('localhost', 3000)
    .setHeader('Content-Type', 'application/json')
    .get('/users/listall')
    .expect(200)
    .expect('Has appropriate properties', utilities.hasAppropriateProperties)
    .export(module);