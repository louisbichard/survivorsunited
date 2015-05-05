var db = require('../../utilities/database.js');
var _ = require('lodash');

module.exports = function(req, res) {

    var respond = require('../../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    console.log('user', req.user);
    var users_id = String(req.user._id);

    db.find('processes', [{
            assignees: {
                $in: [users_id]
            },
            published: 1
        }])
        .then(respond.success)
        .caught(function(err) {
            log.debug(err);
            respond.failure('Could not list processes', err);
        });

};