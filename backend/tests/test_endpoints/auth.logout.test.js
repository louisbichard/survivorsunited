var test_endpoint = "/auth/logout";

var Promise = require('bluebird');
var APIeasy = require('api-easy');
var suite = APIeasy.describe(test_endpoint);
var assert = require('assert');
var utilities = require('../test_utilities/test_utilities.js');
var setup_db = require('../test_utilities/setup.database.js');
var clean_db = require('../test_utilities/clear.database.js');
var log = require('../../utilities/logger.js');
var _ = require('lodash');

clean_db()
    .then(function() {
        return setup_db(
            [{
                collection: "users",
                data: {}
            }, {
                collection: "sessions",
                data: {}
            }]
        );
    })
    .then(function() {
        log.test.endpoint(test_endpoint);
        log.test.describe('Testing general logout');
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            
            suite
                .use('localhost', 3000)
                .setHeader('Content-Type', 'application/json')
                .get(test_endpoint)
                .expect(200)
                .export(module);

            _.delay(resolve, utilities.DELAY);

        });
    })
    .then(process.exit)
    .caught(function(err) {
        log.testFailed(test_endpoint, err);
        process.exit();
    });