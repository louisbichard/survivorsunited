  var APIeasy = require('api-easy');
  var assert = require('assert');
  var suite = APIeasy.describe('your/awesome/api');
  var utilities = require('./test_utilities.js');

   //TEST HEADER
  var test_endpoint = "/sessions/listall";
  utilities.colourful_log(test_endpoint, 'underline');

   //SESSION MANAGEMENT API TESTS
   //----------------------------
  utilities.colourful_log('Listing all users');
  suite
      .use('localhost', 3000)
      .setHeader('Content-Type', 'application/json')
      .get(test_endpoint)
      .expect(200)
      .expect('Should have success', utilities.successIsTrue)
      .expect('Has count value', function(err, res, body) {
          utilities.hasProperty(err, res, body, 'count', 'number');
      })
      .expect('Has result value', function(err, res, body) {
          utilities.hasProperty(err, res, body, 'result', 'object');
      })
      .export(module);

   //ADD OUTPUT SPACE AT END
  console.log(' ');