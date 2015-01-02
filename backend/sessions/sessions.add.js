//ADD SESSION

var Promise = require('bluebird');
var database = require('../utilities/database.js');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var log = require('../utilities/logger.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var setCookie = function(id) {

        log.general('Setting session as', id);

        //REMOVE ANY PREVIOUS COOKIES
        res.clearCookie('auth');

        //SET NEW COOKIE
        res.cookie('auth', id, {
            httpOnly: true
        });
        return id;

    };

    return database.insert('sessions', [{
            user_id: false
        }])
        .then(insertIntoDB)
        .then(function(result) {
            // RETURN THE ID SET BY THE DB
            return result[0]._id;
        })
        .then(setCookie)
        .caught(function(err) {
            respond.generalFailure(err);
        });
};