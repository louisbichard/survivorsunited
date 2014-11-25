var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb"))
    .MongoClient;
var database = require('../utilities/database.js');
var _ = require('lodash');
var log = require('../utilities/logger.js');

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
    _.each(['task_id', 'status'], function(field) {
        if (!post_params[field]) {
            respond.failure('No ' + field + ' field specified');
        }
    });
    // FIND AND CONVERT TASK_ID
    var task_id;
    try {
        task_id = database.getObjectID(post_params.task_id);
    }
    catch (err) {
        respond.failure('Task ID of incorrect format');
    }

    var find_data = function(db) {
        var collection = Promise.promisifyAll(db.collection('tasks'));
        return collection.updateAsync({
            _id: task_id
        }, {
            $set: {
                status: post_params.status
            }
        });
    };

    var send_response = function(result) {
        // IF NO FIELDS UPDATED
        if (result[0] === 0) {
            respond.failure('Could not update task');
        }
        else {
            respond.success('Updated task');
        }
        return result;
    };

    return MongoClient.connectAsync(database.connection)
        .then(find_data)
        .then(send_response)
        .caught(function(err) {
            respond.failure('Could not update task', err);
        });

};