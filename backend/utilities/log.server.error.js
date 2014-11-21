// ENDPOINT /sessions/listall

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');
var log = require('../utilities/logger.js');

module.exports = function(req, res, error_data) {
    if(!req || !res ||  !error_data) {
        throw new Error('Cannot add debug if no req and res or error_data provided');
    }

    log.failure('logging server error');

    var get_user_db = function(db) {
        var collection = Promise.promisifyAll(db.collection('errors'));
        return collection.insertAsync(error_data);
    };

    return MongoClient.connectAsync(database.connection)
        .then(get_user_db)
        .caught(function(err) {
            log.error('Could not log server error!', err);
        });
};