var db = require('../utilities/database.js');
var log = require('../utilities/logger.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    db.find('sessions', [{}])
        .then(respond.success)
        .caught(function(err) {
            log.debug(err);
            respond.failure('Could not list sessions', err);
        });

};