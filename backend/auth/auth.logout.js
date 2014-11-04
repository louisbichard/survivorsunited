// ENDPOINT /sessions/listall

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');
var log = require('../utilities/logger.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });
    
    if (!req.user) {
        respond.success('User is already logged out');
    }

    var insertIntoDB = function(db) {
        var collection = Promise.promisifyAll(db.collection('sessions'));

        return collection.updateAsync({
                user_id: database.getObjectID(req.user._id)
            }, {
                user_id: false
            })
            .then(function(result) {
				
				// VALIDATE
				// Ensure a record is affected                
                if(result[0] === 0) respond.failure('Could not find user to logout');

                return result;
            });
    };

    var respondRequest = function(id) {
        respond.success('User successfully logged out');
    };

    return MongoClient.connectAsync(database.connection)
        .then(insertIntoDB)
        .then(respondRequest)
        .caught(function(err) {
            respond.generalFailure(err);
        });

};