var log = require('../../../backend/utilities/logger.js');
log.test.endpoint('Testing that all APIs arent accessible anonymously');

var Promise = require('bluebird');
var APIeasy = require('api-easy');
var suite = APIeasy.describe('Testing that all APIs arent accessible anonymously');
var assert = require('assert');
var utilities = require('../test_utilities/test_utilities.js');
var setup_db = require('../test_utilities/setup.database.js');
var clean_db = require('../test_utilities/clear.database.js');
var _ = require('lodash');

//SETUP

log.test.hasTODO();

var auth_reject_message = "User is not authenticated";

var endpoint = "users/listall";
log.test.describe(endpoint);

suite
    .use('localhost', 3000)
    .setHeader('Content-Type', 'application/json')
    .get(endpoint)
    .expect(200)
    .before('setAuth', utilities.setAuthCookie)
    .expect('sucessIsTrue', utilities.successIsFalse)
    .expect('Has error message', _.partialRight(utilities.hasErrorMessage, auth_reject_message))
    .next();

suite
    .use('localhost', 3000)
    .setHeader('Content-Type', 'application/json')
    .get('auth/logout')
    .expect(200)
    .before('setAuth', utilities.setAuthCookie)
    .expect('sucessIsTrue', utilities.successIsFalse)
    .expect('Has error message', _.partialRight(utilities.hasErrorMessage, auth_reject_message))
    .next();

suite
    .use('localhost', 3000)
    .setHeader('Content-Type', 'application/json')
    .get('sessions/listall')
    .expect(200)
    .before('setAuth', utilities.setAuthCookie)
    .expect('sucessIsTrue', utilities.successIsFalse)
    .expect('Has error message', _.partialRight(utilities.hasErrorMessage, auth_reject_message))
    .next();

suite
    .use('localhost', 3000)
    .setHeader('Content-Type', 'application/json')
    .get('user/current')
    .expect(200)
    .before('setAuth', utilities.setAuthCookie)
    .expect('sucessIsTrue', utilities.successIsFalse)
    .expect('Has error message', _.partialRight(utilities.hasErrorMessage, auth_reject_message))
    .export(module);