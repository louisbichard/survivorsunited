// ENDPOINT /user/listall

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var send_result = function(result) {
        var find = Promise.promisifyAll(result.find);
        return find.toArrayAsync()
            .then(function(records) {
                respond.success({
                    count: result.count,
                    users: records
                });
            });
    };

    var get_user_db = function(db) {
        var collection = Promise.promisifyAll(db.collection('users'));
        return Promise.props({
            find: collection.findAsync(),
            count: collection.countAsync()
        });
    };

    return MongoClient.connectAsync(database.connection)
        .then(get_user_db)
        .then(send_result)
        .caught(function(err) {
            respond.failure('Could not list users!', err);
        });

};