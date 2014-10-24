// ENDPOINT /events/listall
var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var find_data = function(db) {

        var collection = Promise.promisifyAll(db.collection('events'));
        return Promise.props({
            find: collection.findAsync(),
            count: collection.countAsync()
        });
    };

    var extract_sessions = function(result) {

        var find = Promise.promisifyAll(result.find);
        return find.toArrayAsync()
            .then(function(records) {
                return {
                    count: result.count,
                    result: records
                };
            });
    };

    var send_response = function(vals) {
        respond.success(vals);
    };


    return MongoClient.connectAsync(database.connection)
        .then(find_data)
        .then(extract_sessions)
        .then(send_response)
        .caught(function(err) {
            respond.failure('Could not list events', err);
        });

};