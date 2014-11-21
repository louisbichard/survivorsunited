// SET DATABASE
process.env.DATABASE = 'test';

var Promise = require('bluebird');
var execute = Promise.promisifyAll(require('child_process'));
var log = require('../../../backend/utilities/logger.js');
var fs = Promise.promisifyAll(require('fs'));
var _ = require('lodash');

var test_location = './tests/backend/test_endpoints/';
var args = {};
var stats = {};
var test_files = [];

var readDirectory = function(path) {
    return fs.readdirAsync(path);
};

var assignFilesToArray = function(files) {
    test_files = _.without(files, '.DS_Store');
};

var logStartingOutput = function() {
    if (!args.nolog) {
        log.success('Beginning running: ' + test_files.length + ' tests');
        log.success('On database: ' + process.env.DATABASE);
    }
};

var setupStatValues = function() {
    stats.total_endpoints = test_files.length;
    stats.successful_tests = 0;
};

var run_tests_sequentially = function() {
    return Promise.reduce(test_files, function(total_num_tests, file_path) {
        return execute.execAsync('node ' + test_location + file_path)
            .then(logTestResultToConsole);
    }, 0);
};

var logTestResultToConsole = function(result) {
    stats.successful_tests ++;
    if (!args.nolog) console.log(result[0]);
};

var return_stats = function(success) {
    stats.success = success;
    return stats;
};

module.exports = {
    run: function(args) {
        args = args;
        return readDirectory("./tests/backend/test_endpoints")
            .then(assignFilesToArray)
            .then(logStartingOutput)
            .then(setupStatValues)
            .then(run_tests_sequentially)
            .then(log.test.complete)
            // IF ERROR OR NOT, RETURN STATS
            .then(_.partial(return_stats, true))
            .caught(function(err) {
                log.promiseCaught('Error in running endpoints got to test number ' + stats.successful_tests, err);
                return return_stats();
            });
    }
};