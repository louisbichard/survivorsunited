  var APIeasy = require('api-easy');
  var assert = require('assert');
  var test_user = "test_user" + new Date().getTime() + "@test.com";
  var utilities = require('./test_utilities.js');
  var suite = APIeasy.describe('your/awesome/api');

   //TEST TITLE
  utilities.colourful_log('/user/listall', 'underline');

   //LIST ALL USERS
   //------------------------
  utilities.colourful_log('Listing all users');
  suite
      .use('localhost', 3000)
      .setHeader('Content-Type', 'application/json')
      .get('/users/listall')
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