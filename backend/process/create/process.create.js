var db = require('../../utilities/database.js');

module.exports = function(req, res) {

    var respond = require('../../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var today = new Date().getTime();

    db.insert('processes', [{
            "name": req.body.name,
            "description": req.body.description,
            "assignees": req.body.assignees,
            "tasks": req.body.tasks,
            "published": req.body.tasks,
            "date_added": today,
            "last_updated": today,
        }])
        .then(respond.success)
        .caught(function(err) {
            log.debug(err);
            respond.failure('Could not add process', err);
        });

};