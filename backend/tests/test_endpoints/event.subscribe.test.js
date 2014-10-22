  var APIeasy = require('api-easy');
  var assert = require('assert');
  var suite = APIeasy.describe('your/awesome/api');
  var utilities = require('../test_utilities/test_utilities.js');

   //TEST HEADER
  var test_endpoint = "/events/subscribe";
  utilities.colourful_log(test_endpoint, 'underline');

   //SESSION MANAGEMENT API TESTS
   //----------------------------
  utilities.colourful_log('Accepts request for subscription to event');
  suite
      .use('localhost', 3000)
      .setHeader('Content-Type', 'application/json')
      .post(test_endpoint, {})
      .expect(200)
      .expect('Has appropriate properties', utilities.hasAppropriateProperties)
      .export(module);

   //ADD OUTPUT SPACE AT END
  console.log(' ');