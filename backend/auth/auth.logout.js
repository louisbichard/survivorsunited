var Promise = require('bluebird');
var db = require('../utilities/database.js');
var log = require('../utilities/logger.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var insertIntoDB = function(db) {
        var updateQuery = [{
            user_id: db.getObjectID(req.user._id)
        }, {
            user_id: false
        }];

        return db.update('sessions', updateQuery);
    };

    // VALIDATE USERS SESSION
    if (!req.user || !req.user._id) {
        respond.success('User is already logged out');
    }

    else {
        return db.connect()
            .then(insertIntoDB)
            .then(_.partialRight(db.ensureDBRecords, respond))
            .then(_.partialRight(respond.success, 'User successfully logged out'))
            .caught(respond.generalFailure);
    }
};