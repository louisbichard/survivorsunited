  var APIeasy = require('api-easy');
  var assert = require('assert');
  var test_user = "test_user" + new Date().getTime() + "@test.com";
  var utilities = require('./test_utilities.js');
  var suite = APIeasy.describe('your/awesome/api');

   //LOGGING IN
   //----------
  suite.discuss('When authenticating')
      .discuss('and getting all sessions')
      .use('localhost', 3000)
      .setHeader('Content-Type', 'application/json')
      .post('/auth/login')
      .expect(200)
      .export(module);

   //ADD OUTPUT SPACE AT END
  console.log(' ');