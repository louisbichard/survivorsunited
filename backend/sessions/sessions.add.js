//ADD SESSION

var Promise = require('bluebird');
var database = require('../utilities/database.js');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var insertIntoDB = function(db) {
        var collection = Promise.promisifyAll(db.collection('sessions'));
        return collection.insertAsync({})
            .then(function(result) {
                // RETURN THE ID SET BY THE DB
                return result[0]._id;
            });
    };

    var setCookie = function(id) {

        console.log('Setting user session as: ' + id);

        res.cookie('auth', id, {
            httpOnly: true
        });

    };

    return MongoClient.connectAsync(database.connection)
        .then(insertIntoDB)
        .then(setCookie)
        .caught(function(err) {
            respond.generalFailure(err);
        });
};