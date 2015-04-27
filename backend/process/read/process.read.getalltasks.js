var db = require('../../utilities/database.js');
var _ = require('lodash');

module.exports = function(req, res) {

    var respond = require('../../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    console.log(typeof req.GET.id);

    // TODO: EXTEND WITH SEARCH QUERY HERE
    db.find('processes', [{
            _id: req.GET.id
        }, {
            tasks: true
        }])
        .then(respond.success)
        .caught(function(err) {
            log.debug(err);
            respond.failure('Could not list processes', err);
        });

};