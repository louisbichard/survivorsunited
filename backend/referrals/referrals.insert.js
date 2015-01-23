var db = require('../utilities/database.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    db.insert('referrals', [{
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "phone": req.body.phone,
            "details": req.body.details,
            "date_added": new Date().getTime(),
            "is_open": true
        }])
        .then(respond.success)
        .caught(function(err) {
            log.debug(err);
            respond.failure('Could not perform search', err);
        });

};