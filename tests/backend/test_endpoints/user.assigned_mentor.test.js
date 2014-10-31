  var test_endpoint = "/user/assigned_mentor";

  var log = require('../../../backend/utilities/logger.js');
  log.test.endpoint(test_endpoint);

  var Promise = require('bluebird');
  var assert = require('assert');
  var utilities = require('../test_utilities/test_utilities.js');
  var setup_db = require('../test_utilities/setup.database.js');
  var clean_db = require('../test_utilities/clear.database.js');
  var _ = require('lodash');
  var APIeasy = require('api-easy');
  var suite = APIeasy.describe(test_endpoint);

  //SETUP
  setup_db(
      [
          //STUB OUT USERS
          {
              collection: "users",
              data: {
                  _id: utilities.dummy_id.USER_ID,
                  username: "username",
                  password: "password",
                  mentor: utilities.dummy_id.USER_ID
              }
          },

          // STUB OUT SESSIONS
          {
              collection: "sessions",
              data: {
                  _id: utilities.getAuthCookie(),
                  user_id: utilities.dummy_id.USER_ID
              }
          }
      ]
  )

  // DESCRIBE
  .then(function() {
      log.test.describe('Can see assigned mentor');
  })

  //RUN
  .then(function() {
      return new Promise(function(resolve, reject) {

          suite
              .use('localhost', 3000)
              .setHeader('Content-Type', 'application/json')
              .get(test_endpoint)
              .expect(200)
              .before('setAuth', utilities.setAuthCookie)
              .expect('sucessIsTrue', utilities.successIsTrue)
              .export(module);

          _.delay(resolve, utilities.DELAY);

      });
  })

  // EXIT TEST
  .then(process.exit)

  // CATCH ERRORS
  .caught(function(err) {
      log.debug('err', err);
      log.test.failed(test_endpoint, err);

      //EXIT REGARDLESS
      process.exit();
  });