var db = require('../../utilities/database.js');
var _ = require('lodash');
var log = require('../../utilities/logger.js');

module.exports = function(req, res) {

    var respond = require('../../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    // TODO: EXTEND WITH SEARCH QUERY HERE
    db.update('processes', [{
            "_id": req.body.id
        }, {
            $set: {
                assignees: req.body.assignees
            }
        }])
        .then(respond.success)
        .caught(function(err) {
            console.log(err);
            log.debug(err);
            respond.failure('Could not publish process', err);
        });

};