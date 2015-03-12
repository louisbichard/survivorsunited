var db = require('../../utilities/database.js');
var _ = require('lodash');

module.exports = function(req, res) {

    var respond = require('../../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    // TODO: EXTEND WITH SEARCH QUERY HERE
    db.find('processes', [{}, {"_id": 1, "name": 1, "description": 1}])
        .then(respond.success)
        .caught(function(err) {
            log.debug(err);
            respond.failure('Could not list processes', err);
        });

};