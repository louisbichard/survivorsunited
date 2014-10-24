// SET DATABASE
process.env.DATABASE = 'test';

var Promise = require('bluebird');
var execAsync = Promise.promisifyAll(require('child_process'));
var log = require('../../utilities/logger.js');
var fs = Promise.promisifyAll(require('fs'));
var _ = require('lodash');


module.exports = {
    run: function() {
        return fs.readdirAsync('./backend/tests/test_endpoints').then(function(files) {
            files = _.without(files, '.DS_Store');

            log.success('Beginning running: ' + files.length + ' tests');
            log.success('On database: ' + process.env.DATABASE);

            _.each(files, function(file_path) {
                execAsync.execAsync('node ' + './backend/tests/test_endpoints/' + file_path)
                    .then(function(result) {
                        //ECHO OUT TEST OUTPUT
                        console.log(result[0]);
                    })
                    .caught(function(err) {
                        log.promiseCaught('Error in running endpoints', err);
                    });
            });

        });


    }
};