var db = require('../../utilities/database.js');

module.exports = function(req, res) {

    var respond = require('../../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    // NOTE: WARNING, THIS API DOES NOT WORK

    db.find('events', [{
            /*attending: {
                $in: ["550bf26eaa5a3c5d33ba93ba"]
            },
            watching: {
                $in: ["550bf26eaa5a3c5d33ba93ba"]
            }*/
        }])
        .then(respond.success)
        .caught(function(err) {
            log.debug(err);
            respond.failure('Could not list events', err);
        });

};