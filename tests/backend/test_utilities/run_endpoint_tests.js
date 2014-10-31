// SET DATABASE
process.env.DATABASE = 'test';

var Promise = require('bluebird');
var execute = Promise.promisifyAll(require('child_process'));
var log = require('../../../backend/utilities/logger.js');
var fs = Promise.promisifyAll(require('fs'));
var _ = require('lodash');


var readDirectory = function(path) {
    return fs.readdirAsync(path);
};

var run_tests_sequentially = function(files) {
    files = _.without(files, '.DS_Store');

    log.success('Beginning running: ' + files.length + ' tests');
    log.success('On database: ' + process.env.DATABASE);

    return Promise.reduce(files, function(total_num_tests, file_path) {
        return execute.execAsync('node ' + './tests/backend/test_endpoints/' + file_path)
            .then(function(result) {

                // LOG OUT THE TEXT OF THE TEST
                var text_output = result[0];
                console.log(text_output);

                // CALCULATE THE NUMBER OF TESTS
                // ONLY WORKS FOR SINGLE INTEGERS
                var index_of_honored = text_output.indexOf("honored");
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

module.exports = {
    run: function() {
        return readDirectory("./tests/backend/test_endpoints")
            .then(run_tests_sequentially)
            .then(function(result) {
                log.test.complete(result);
                return result;
            })
            .then(run_finale_sequence)
            .then(log_finale_to_console)
            .caught(function(err) {
                log.promiseCaught('Error in running endpoints', err);
            });
    }
};