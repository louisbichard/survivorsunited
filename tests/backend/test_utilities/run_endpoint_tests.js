// SET DATABASE
process.env.DATABASE = 'test';

var Promise = require('bluebird');
var execute = Promise.promisifyAll(require('child_process'));
var log = require('../../../backend/utilities/logger.js');
var fs = Promise.promisifyAll(require('fs'));
var _ = require('lodash');


var stats = {};

var readDirectory = function(path) {
    return fs.readdirAsync(path);
};

var run_tests_sequentially = function(files, nolog) {
    files = _.without(files, '.DS_Store');

    if (!nolog) {
        log.success('Beginning running: ' + files.length + ' tests');
        log.success('On database: ' + process.env.DATABASE);
    }

    // SET UP STATS VALUES
    stats.total_endpoints = files.length;
    stats.successful_tests = 0;

    return Promise.reduce(files, function(total_num_tests, file_path) {
        return execute.execAsync('node ' + './tests/backend/test_endpoints/' + file_path)
            .then(function(result) {

                // LOG OUT THE TEXT OF THE TEST
                var text_output = result[0];
                if (!nolog) console.log(text_output);

                // CALCULATE THE NUMBER OF TESTS
                // ONLY WORKS FOR SINGLE INTEGERS
                var index_of_honored = text_output.indexOf("honored");

                if (index_of_honored > -1) stats.successful_tests++;

                var num_of_tests_ran = parseInt(text_output[index_of_honored - 7], 10);

                return total_num_tests + num_of_tests_ran;
            });
    }, 0);

};

//AWESOME FINALE
var run_finale_sequence = function() {
    console.log(__dirname);
    return readDirectory('./tests/test_outputs')
        .then(function(files) {
            //CHOOSE RANDOM
            var random_int = (Math.random() * (files.length)).toString().split('.')[0];
            var chosen_file = files[random_int];
            var command = 'cat ./tests/test_outputs/' + chosen_file;
            return execute.execAsync(command);
        });
};

var log_finale_to_console = function(result) {
    console.log(result[0]);
};

var return_stats = function() {
    return stats;
};

module.exports = {
    run: function(args) {
        args = args || {};
        return readDirectory("./tests/backend/test_endpoints")
            .then(_.partialRight(run_tests_sequentially, args.nolog))
            .then(log.test.complete)
            .then(run_finale_sequence)
            .then(log_finale_to_console)
            .then(return_stats)
            .caught(function(err) {
                log.promiseCaught('Error in running endpoints', err);
            });
    }
};