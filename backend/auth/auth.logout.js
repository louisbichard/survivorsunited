var Promise = require('bluebird');
var db = require('../utilities/database.js');
var log = require('../utilities/logger.js');
var _ = require('lodash');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    console.log('user details', req.user);
    if (!req.user) respond.success('User is already logged out');

    else {
        return db.insert('sessions', [{
                user_id: db.getObjectID(req.user._id)
            }, {
                user_id: false
            }])
            .then(_.partial(respond.success, 'User successfully logged out'))
            .caught(respond.generalFailure);
    }
};