  var APIeasy = require('api-easy');
  var assert = require('assert');
  var test_user = "test_user" + new Date().getTime() + "@test.com";
  var utilities = require('../test_utilities/test_utilities.js');
  var suite = APIeasy.describe('your/awesome/api');

   //TEST TITLE
  utilities.colourful_log('/users/listall', 'underline');

   //LIST ALL USERS
   //------------------------
  utilities.colourful_log('Listing all users');
  suite
      .use('localhost', 3000)
      .setHeader('Content-Type', 'application/json')
      .get('/users/listall')
      .expect(200)
      .expect('Has appropriate properties', utilities.hasAppropriateProperties)
      .export(module);

   //ADD OUTPUT SPACE AT END
  console.log(' ');