// ENDPOINT /events/listall
var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');
var _ = require('lodash');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });



    var post_params = req.body;

    //VALIDATION: ENSURE VALUES ARE SET
    _.each(['title', 'date', 'price', 'description'], function(field) {
        if (!post_params[field]) {
            respond.failure('No ' + field + ' field specified');
        }
    });

    if (!post_params.title) {
        respond.failure('No title field specified');
    }

    var find_data = function(db) {

        var collection = Promise.promisifyAll(db.collection('events'));
        return collection.insertAsync({
            title: post_params.title,
            description: post_params.description,
            date: post_params.date,
            watchers: [req.user._id],
            attending: [],
            price: post_params.price
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