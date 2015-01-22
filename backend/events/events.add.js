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

    var post_params = req.body;
    var watchers = [];

    // ADD USER AS WATCHER IF FOUND
    if (req.user && req.user._id) {
        watchers.push(req.user._id);
    }

    //VALIDATION: ENSURE VALUES ARE SET
    _.each(['title', 'start', 'end', 'price', 'description'], function(field) {
        if (!post_params[field]) {
            respond.failure('No ' + field + ' field specified');
        }
    });

    var find_data = function(db) {

        var collection = Promise.promisifyAll(db.collection('events'));
        return collection.insertAsync({
            title: post_params.title,
            description: post_params.description,
            start: post_params.end,
            end: post_params.start,
            postcode: post_params.postcode,
            watching: watchers,
            attending: [],
            date_created: new Date()
                .getTime(),
            price: post_params.price,
            created_by: req.user._id
        });
    };

    var send_response = function(vals) {
        respond.success(vals);
    };

    return MongoClient.connectAsync(database.connection)
        .then(find_data)
        .then(send_response)
        .caught(function(err) {
            respond.failure('Could not add event', err);
        });

};