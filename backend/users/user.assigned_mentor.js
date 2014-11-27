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

    req.user = req.user || {};

    //VALIDATION: USER HAS NO MENTOR
    if (!req.user && !req.user.mentor) {
        respond.success(false);
    }

    var mentor_id = req.user.mentor;

    try {
        if (mentor_id) mentor_id = database.getObjectID(mentor_id);
    }
    catch (e) {
        respond.failure('Mentor ID of incorrect format');
    }

    var get_user_db = function(db) {
        var collection = Promise.promisifyAll(db.collection('users'));
        return collection.findAsync({
            _id: mentor_id
        });
    };

    var get_user_data = function(result) {
        var count = result.count;
        var find = Promise.promisifyAll(result);

        return find.toArrayAsync()
            .then(function(mentor) {
                //VALIDATION                
                if (!mentor[0]) {
                    respond.failure('Assigned mentor not found');
                }
                return mentor[0];
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