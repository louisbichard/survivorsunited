// MIDDLEWARE USED TO BIND USER TO RES OBJECT

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');

module.exports = function(req, res, id) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    // CONVERT ID TO USEFUL MONGO VALUE
    id = database.getObjectID(id);

    var callMongo = function() {
        return MongoClient.connectAsync(database.connection);
    };

    var get_session_db = function(db) {
        var collection = Promise.promisifyAll(db.collection('sessions'));
        return collection.findAsync({
            _id: id
        });
    };

    var getUserDB = function(user_id) {
        return callMongo()
            .then(function(db) {
                return getUserByID(db, user_id);
            });
    };

    var getUserIDFromSession = function(result) {
        var find = Promise.promisifyAll(result);

        return find
            .toArrayAsync()
            .then(function(session) {
                return session[0].user_id;
            });
    };

    var bindUserToRequestObject = function(vals) {
        req.user = vals;
    };

    var getUserByID = function(db, user_id) {
        var collection = Promise.promisifyAll(db.collection('users'));

        return collection
            .findAsync({
                _id: user_id
            })
            .then(getUserFromUserDB);
    };

    var getUserFromUserDB = function(result) {
        var find = Promise.promisifyAll(result);
        return find
            .toArrayAsync()
            .then(function(session) {
                return session[0];
            });
    };

    var postErrorToConsole = function(err) {
        respond.failure('Could not list users!', err);
    };

    return callMongo()
        .then(get_session_db)
        .then(getUserIDFromSession)
        .then(getUserDB)
        .then(bindUserToRequestObject)
        .caught(postErrorToConsole);

};