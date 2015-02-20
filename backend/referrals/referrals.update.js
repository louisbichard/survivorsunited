var db = require('../utilities/database.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    console.log(req.body);

    db.update('referrals', [{
            "_id": req.body.id,
        }, {
            "$set": {
                "is_open": (req.body.is_open === 'true' || req.body.is_open === 1),
            }
        }, ])
        .then(respond.success)
        .caught(function(err) {
            log.debug(err);
            respond.failure('Could not perform update', err);
        });

};