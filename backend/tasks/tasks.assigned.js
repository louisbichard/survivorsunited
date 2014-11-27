// ENDPOINT /user/listall

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb"))
    .MongoClient;
var database = require('../utilities/database.js');
var utility_date = require('../utilities/utilities.dates.js');
var _ = require('lodash');
var log = require('../utilities/logger.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    respond.rejectAnon();

    var user_id = req.user._id.toString();

    var get_user_db = function(db) {
        var collection = Promise.promisifyAll(db.collection('tasks'));
        return collection.findAsync({
            assignee: user_id
        });
    };

    var get_user_data = function(result) {
        var find = Promise.promisifyAll(result);
        return find.toArrayAsync()
            .then(function(tasks) {
                return tasks;
            });
    };

    var send_result = function(vals) {
        respond.success(vals);
    };

    return MongoClient.connectAsync(database.connection)
        .then(get_user_db)
        .then(get_user_data)
        .then(send_result)
        .caught(function(err) {
            respond.failure('Could not list all assigned tasks', err);
        });

};