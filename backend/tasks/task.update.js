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

    var post_params = req.body;
    var watchers = [];

    //VALIDATION: ENSURE VALUES ARE SET
    _.each(['task_id'], function(field) {
        if (!post_params[field]) {
            respond.failure('No ' + field + ' field specified');
        }
    });
    // FIND AND CONVERT TASK_ID
    var task_id;
    try {
        task_id = database.getObjectID(post_params.task_id);
    } catch (err) {
        respond.failure('Task ID of incorrect format');
    }

    var send_response = function(result) {
        // IF NO FIELDS UPDATED
        if (result[0] === 0) {
            respond.failure('No fields were updated');
        } else {
            respond.success('Updated task');
        }
        return result;
    };
    var query = {
        '_id': database.getObjectID(post_params.task_id),
    };
    var options = {
        $set: {}
    };
    var values_to_update = _.pick(post_params, 'status', 'rating');

    _.each(values_to_update, function(val, key) {
        // ADD TIME FOR STATUS CHANGES
        if (key === 'status') {
            options.$set['assignees.' + req.user._id.toString() + '.' + 'status_changed'] = new Date()
                .getTime();
        }

        options.$set['assignees.' + req.user._id.toString() + '.' + key] = post_params[key];
    });

    return database.update('tasks', [query, options])
        .then(send_response)
        .caught(function(err) {
            respond.failure('Could not update task', err);
        });

};