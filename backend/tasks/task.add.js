// ENDPOINT /events/listall
// 

// TODO: TEST
// 1) ONLY ALLOW AUTHENTICATED USERS

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb"))
    .MongoClient;
var database = require('../utilities/database.js');
var _ = require('lodash');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    respond.rejectAnon();

    var post_params = req.body;
    var watchers = [];

    //VALIDATION: ENSURE VALUES ARE SET
    _.each(['title', 'assignee', 'description'], function(field) {
        if (!post_params[field]) {
            respond.failure('No ' + field + ' field specified');
        }
    });

    var find_data = function(db) {
        var collection = Promise.promisifyAll(db.collection('tasks'));
        return collection.insertAsync({
            title: post_params.title,
            description: post_params.description,
            status: "open",
            assignee: post_params.assignee,
            date_created: new Date()
                .getTime()
        });
    };

    var send_response = function(vals) {
        respond.success(vals);
    };

    return MongoClient.connectAsync(database.connection)
        .then(find_data)
        .then(send_response)
        .caught(function(err) {
            respond.failure('Could not add task', err);
        });

};