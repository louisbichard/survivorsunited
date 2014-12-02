var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb"))
    .MongoClient;
var database = require('../utilities/database.js');
var log = require('../utilities/logger.js');
var execute = Promise.promisifyAll(require('child_process'));
var fs = Promise.promisifyAll(require('fs'));

module.exports = function(req, res) {
    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    return execute.execAsync('cr ./scripts --output ./tests/complexity.json --format json')
        .then(function(files) {
            fs.readFileAsync('tests/complexity.json', {
                    encoding: 'utf8'
                })
                .then(function(output) {
                    return respond.success({
                        success: JSON.parse(output)
                    });
                })
                .caught(function() {
                    return respond.failure('Error in read file');
                });

        })
        .caught(function(err) {
            respond.failure('Error in execute');
        });
};