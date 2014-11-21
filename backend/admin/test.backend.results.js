// ENDPOINT /sessions/listall

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');
var log = require('../utilities/logger.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    require('../../tests/backend/test_utilities/run_endpoint_tests.js').run({nolog: true})
    .then(function(result){
        //TODO: Work out if success or failures
        result.success = (result.total_endpoints === result.successful_tests);
        return respond.success(result);
    }).caught(function(){
        return respond.failure('Back end tests failed');
    });
};