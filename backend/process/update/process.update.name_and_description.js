var db = require('../../utilities/database.js');
var _ = require('lodash');
var log = require('../../utilities/logger.js');

module.exports = function(req, res) {

    var respond = require('../../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var update_fields = _.pick(req.body, ["description", "name"]);

    update_fields = _.extend(update_fields, {last_updated: new Date().getTime() });

    db.update('processes', [{
            _id: req.body.id
        }, {
            $set: update_fields
        }])
        .then(respond.success)
        .caught(function(err) {
            console.log(err);
            log.debug(err);
            respond.failure('Could not update task name or description', err);
        });

};