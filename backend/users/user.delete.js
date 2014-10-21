//ENDPOINT /user/delete

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');

//SETUP PARAMETERS
var post_params = {};


module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    post_params = req.body || {};

    //VALIDATION: No ID specified
    if (!post_params.id) {
        respond.failure("no ID specified");
    }

    var find_data = function() {
        var collection = Promise.promisifyAll(user_database.collection('users'));
        return collection.countAsync({
            username: post_params.username
        });
    };

    var delete_record = function() {
        var id = database.getObjectID(post_params.id);
        var collection = Promise.promisifyAll(user_database.collection('users'));
        return collection.removeAsync({
            _id: id
        }).then(function(result) {

            // CHECK HOW MANY USERS WERE REMOVED
            if (result[1].n === 0) {
                respond.failure('ID does not match a user');
            } else {
                respond.success('User removed');
            }

        }).caught(function(err) {
            respond.failure('User could not be removed');
        });
    };

    return MongoClient.connectAsync(database.connection)
        .then(function(db) {
            user_database = db;
        })
        .then(find_data)
        .then(delete_record)
        .caught(function(err) {
            respond.failure("Could not remove user", err);
        });
};