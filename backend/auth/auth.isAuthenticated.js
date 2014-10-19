// ENDPOINT /auth/isAuthenticated

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');

module.exports = function(req, res) {
    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var current_session_id = req.cookies.auth;

    // If nothing found in the node request, then return as such
    if (current_session_id === undefined) {
        respond.success(true);
    }

    var findSessionInDB = function(db) {
        return Promise.promisifyAll(db.collection('sessions')).findAsync({
            _id: database.getObjectID(current_session_id)
        });
    };

    var formatResult = function(result) {
        return Promise.promisifyAll(result).toArrayAsync();
    };

    var sendResult = function(records) {
        console.log(records);
        var isAuth = !!records[0];
        respond.success(isAuth);
    };


    return MongoClient.connectAsync(database.connection)
        .then(findSessionInDB)
        .then(formatResult)
        .then(sendResult)
        .caught(function(err) {
            respond.failure('could not find session', err);
        });
};