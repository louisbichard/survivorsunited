  var APIeasy = require('api-easy');
  var assert = require('assert');
  var test_user = "test_user" + new Date().getTime() + "@test.com";
  var utilities = require('./test_utilities.js');
  var suite = APIeasy.describe('your/awesome/api');
  var test_endpoint = "/user/add";
   //TEST TITLE OUTPUT
  utilities.colourful_log(test_endpoint, 'underline');

   // TEST WITHOUT USERNAME & PASSWORD
  utilities.colourful_log('adding user without credentials');
  suite
      .use('localhost', 3000)
      .setHeader('Content-Type', 'application/json')
      .post(test_endpoint, {})
      .expect(200)
      .expect('Has appropriate properties', utilities.hasAppropriateProperties)
      .export(module);

   // TEST WITHOUT USERNAME
  utilities.colourful_log('adding user without username');
  suite
      .use('localhost', 3000)
      .setHeader('Content-Type', 'application/json')
      .post(test_endpoint, {
          password: "password"
      })
      .expect(200)
      .expect('Has appropriate properties', utilities.hasAppropriateProperties)
      .export(module);


   // TEST WITH LESS THAN 5 CHARACTER PASSWORD
  utilities.colourful_log('adding user with short password');
  suite
      .use('localhost', 3000)
      .setHeader('Content-Type', 'application/json')
      .post(test_endpoint, {
          username: "test",
          password: "pass"
      })
      .expect(200)
      .expect('Has appropriate properties', utilities.hasAppropriateProperties)
      .export(module);

   // ADDS RANDOM USER
  utilities.colourful_log('adds random user');
  suite
      .use('localhost', 3000)
      .setHeader('Content-Type', 'application/json')
      .post(test_endpoint, {
          username: test_user,
          password: "password"
      })
      .expect(200)
      .expect('Has appropriate properties', utilities.hasAppropriateProperties)
      .export(module);

   // CANNOT ADD USER PREVIOUSLY ADDED
  utilities.colourful_log('adds random user');
  suite
      .use('localhost', 3000)
      .setHeader('Content-Type', 'application/json')
      .post(test_endpoint, {
          username: test_user,
          password: "password"
      })
      .expect(200)
      .expect('Has appropriate properties', utilities.hasAppropriateProperties)
      .export(module);

   //ADD OUTPUT SPACE AT END
  console.log(' ');