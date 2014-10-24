var test_endpoint = '/auth/login';

var APIeasy = require('api-easy');
var assert = require('assert');
var test_user = "test_user" + new Date().getTime() + "@test.com";
var utilities = require('../test_utilities/test_utilities.js');
var suite = APIeasy.describe('your/awesome/api');
var log = require('../../utilities/logger.js');


log.test.endpoint(test_endpoint);
log.test.describe('Logging in');

suite.discuss('When authenticating')
    .discuss('and getting all sessions')
    .use('localhost', 3000)
    .setHeader('Content-Type', 'application/json')
    .post(test_endpoint)
    .expect(200)
    .export(module);
