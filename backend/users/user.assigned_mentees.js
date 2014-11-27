// ENDPOINT /user/assigned_mentees

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

    //VALIDATION: NO USER ID
    if (!req.user._id) {
        respond.failure('No session found');
    }

    //VALIDATION: NOT A MENTOR
    if (!req.user && req.user.role !== "Mentor") {
        respond.failure('Cannot have mentees when role is not mentor');
    }

    var user_id = req.user._id || "";
    user_id = user_id.toString();

    var get_user_db = function(db) {
        var collection = Promise.promisifyAll(db.collection('users'));
        return collection.findAsync({
            // TO STRING IS REQUIRED TO CONVERT MONGO OBJECT ID BACK TO STRING
            mentor: user_id
        });
    };

    var get_user_data = function(result) {
        var count = result.count;
        var find = Promise.promisifyAll(result);

        return find.toArrayAsync()
            .then(function(mentees) {
                //VALIDATION
                if (!mentees[0]) {
                    respond.success(false);
                }
                return mentees;
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
            respond.failure('Could not find assigned mentor', err);
        });

};