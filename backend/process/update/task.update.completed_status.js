var db = require('../../utilities/database.js');
var _ = require('lodash');
var log = require('../../utilities/logger.js');

module.exports = function(req, res) {

    var respond = require('../../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var query = {
        _id: req.body.process_id
    };

    db.find('processes', [query])
        .then(function(result) {

            var process = result[0];
            var task_index = _.findIndex(process.tasks, {
                id: req.body.task_id
            });
            if (task_index === -1) respond.failure('Task ID not found for this process');

            var completed_by = process.tasks[task_index].completed_by || [];
            var user_id = String(req.user._id);

            if (req.body.is_complete) {
                completed_by.push(user_id);
                completed_by = _.uniq(completed_by);
            } else {
                var index_of_user = completed_by.indexOf(user_id);
                completed_by.splice(index_of_user, 1);
            }

            var set_query = {
                upsert: true,
            };

            set_query["tasks" + "." + task_index + ".completed_by"] = completed_by;

            console.log(set_query);

            return db.update('processes', [query, {
                $set: set_query
            }]).then(function() {
                return db.find('processes', [query]);
            });



        })
        .then(respond.success)
        .caught(function(err) {
            console.log(err);
            log.debug(err);
            respond.failure('Could not update task content', err);
        });

};