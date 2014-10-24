  var APIeasy = require('api-easy');
  var assert = require('assert');
  var suite = APIeasy.describe('your/awesome/api');
  var utilities = require('../test_utilities/test_utilities.js');
  var log = require('../../utilities/logger.js');

  var test_endpoint = "/user/assigned_mentor";
  log.test.endpoint(test_endpoint);

  log.test.describe('Assigned mentor API');
  suite
      .use('localhost', 3000)
      .setHeader('Content-Type', 'application/json')
      .get(test_endpoint)
      .expect(200)
      .expect('Has appropriate properties', utilities.hasAppropriateProperties)
      .export(module);
