// ENDPOINT /user/listall

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');
var utility_date = require('../utilities/utilities.dates.js');
var log = require('../utilities/logger.js');
var _ = require('lodash');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    req.user = req.user || {};

    // VALIDATE AUTHENTICATION
    respond.rejectAnon();

    var post_params = req.body;

    //VALIDATION FOR 
    if (!post_params.mentor_id) {
        respond.failure('No Mentor ID was sent');
    }

    var mentor_id = post_params.mentor_id;
    var user_id = req.user._id;

    try {
        mentor_id = database.getObjectID(mentor_id);
        user_id = database.getObjectID(user_id);
    } catch (err) {
        respond.failure('Could not format ID', err);
    }

    var get_user_db = function(db) {
        var collection = Promise.promisifyAll(db.collection('users'));
        return collection.updateAsync({
            _id: user_id
        }, {
            $set: {
                mentor: mentor_id
            }
        });

    };

    var get_user_data = function(result) {
        log.debug(result);
        if(result[0] === 0) {
            respond.failure('Could not assign mentor to user');
        }
        return result;
    };

    var send_result = function(vals) {
        respond.success('Mentor was assigned');
    };

    return MongoClient.connectAsync(database.connection)
        .then(get_user_db)
        .then(get_user_data)
        .then(send_result)
        .caught(function(err) {
            respond.failure('Could not assign mentor', err);
        });

};