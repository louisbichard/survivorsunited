/*  var APIeasy = require('api-easy');
  var assert = require('assert');
  var utilities = require('./test_utilities.js');
  var suite = APIeasy.describe('your/awesome/api');
  var endpoint = "/auth/isauthenticated";
   //TEST TITLE
  utilities.colourful_log(endpoint, 'underline');

   //LIST ALL USERS
   //------------------------
  utilities.colourful_log('Is aunthenticated');
  suite
      .use('localhost', 3000)
      .setHeader('Content-Type', 'application/json')
      .get(endpoint)
      .expect(200)
      .expect('Should have success', utilities.successIsTrue)
      .expect('Has result value', function(err, res, body) {
          utilities.hasProperty(err, res, body, 'is_authenticated', 'boolean');
      })
      .export(module);

   //ADD OUTPUT SPACE AT END
  console.log(' ');*/