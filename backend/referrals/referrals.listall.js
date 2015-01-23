var db = require('../utilities/database.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    db.find('referrals', [{}])
        .then(respond.success)
        .caught(function(err) {
            log.debug(err);
            respond.failure('Could not perform search', err);
        });

};