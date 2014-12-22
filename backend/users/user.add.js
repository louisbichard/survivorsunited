//ENDPOINT /user/add

// TODO: ADD TESTS
// 
// 1) ADD CHECK FOR SUCCESS MESSAGE

var _ = require('lodash')
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

    var post_params = req.body;

    var find_data = function() {
        var collection = Promise.promisifyAll(user_database.collection('users'));
        return collection.countAsync({
            username: post_params.username
        });
    };

    var createInsertObject = function() {
        data_to_insert = {
            date_created: new Date().getTime(),
            mentor: false,
            role: "Basic",
            severity_grade: "Low"
        };
        return _.extend(data_to_insert, post_params);
    };

    var add_record = function(insert_data) {
        var collection = Promise.promisifyAll(user_database.collection('users'));
        log.debug(insert_data);
        return collection.insertAsync(insert_data);
    };

    var check_if_user_exists = function(count) {
        if (count >= 1) {
            respond.failure("Username already exists");
        }
        return count;
    };

    //VALIDATION: Username and Password must be present
    if (!post_params.username || !post_params.password) {
        respond.failure("no username or password specified");
    }

    //VALIDATION; Password insufficient complexity
    else if (post_params.password.length < 5) {
        respond.failure("Password must be more than 5 characters");
    } else {
        return MongoClient.connectAsync(database.connection)
            .then(function(db) {
                user_database = db;
            })
            .then(find_data)
            .then(check_if_user_exists)
            .then(createInsertObject)
            .then(add_record)
            .then(function(result) {
                respond.success("User " + post_params.username + ' added');
            })
            .caught(function(err) {
                console.log(err);
                respond.failure('Could not add user', 'Error adding record in database: (' + err + ')');
            });
    }

};
