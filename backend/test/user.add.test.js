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
      .expect('Has error message', function(err, res, body) {
          utilities.hasProperty(err, res, body, 'error_message', 'string');
      })
      .expect('Should have success', utilities.successIsFalse)
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
      .expect('Should have success', utilities.successIsFalse)
      .expect('Has error message', function(err, res, body) {
          utilities.hasProperty(err, res, body, 'error_message', 'string');
      })
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
      .expect('Should have success as false', utilities.successIsFalse)
      .expect('Has error message', function(err, res, body) {
          utilities.hasProperty(err, res, body, 'error_message', 'string');
      })
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
      .expect('Should have success as false', utilities.successIsTrue)
      .expect('Has result', function(err, res, body) {
          utilities.hasProperty(err, res, body, 'result', 'string');
      })
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
      .expect('Should have success as false', utilities.successIsFalse)
      .expect('Has error message', function(err, res, body) {
          utilities.hasProperty(err, res, body, 'error_message', 'string');
      })
      .export(module);

   //ADD OUTPUT SPACE AT END
  console.log(' ');