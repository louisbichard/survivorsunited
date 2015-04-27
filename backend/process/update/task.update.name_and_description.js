var db = require('../../utilities/database.js');
var _ = require('lodash');
var log = require('../../utilities/logger.js');

module.exports = function(req, res) {

    var respond = require('../../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var TASK_ID = req.body.task_id;
    var find_query = {
        _id: req.body.process_id
    };

    // TODO: EXTEND WITH SEARCH QUERY HERE
    db.find('processes', [find_query, {
            tasks: true
        }])
        .then(function(result) {
            var tasks = result[0].tasks;
            var idx = _.findIndex(result[0].tasks, {
                id: TASK_ID
            });
            if (idx === -1) respond.failure('Could not find task with ID' + TASK_ID);
            tasks[idx].name = req.body.name;
            tasks[idx].description = req.body.description;
            return tasks;
        })
        .then(function(tasks) {
            // UPDATE WITH NEW TASKS ARRAY
            return db.update('processes', [
                find_query, {
                    $set: {
                        tasks: tasks
                    }
                }
            ]);
        })
        .then(respond.success)
        .caught(function(err) {
            console.log(err);
            log.debug(err);
            respond.failure('Could not update task name and description', err);
        });

};