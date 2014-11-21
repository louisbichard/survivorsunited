// ENDPOINT /sessions/listall

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');
var log = require('../utilities/logger.js');
var execute = Promise.promisifyAll(require('child_process'));

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    return execute.execAsync('./node_modules/karma/bin/karma start --single-run=true')
        .then(function(files) {
            respond.success({
                success: true
            });
        }).caught(function(err) {
            respond.failure(err);
        });
};