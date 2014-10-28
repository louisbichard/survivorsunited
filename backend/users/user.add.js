//ENDPOINT /user/add

// TODO: ADD TESTS
// 
// 1) ADD CHECK FOR SUCCESS MESSAGE

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

    //VALIDATION: Username and Password must be present
    if (!post_params.username || !post_params.password) {
        respond.failure("no username or password specified");
    }

    //VALIDATION; Password insufficient complexity
    if (post_params.password.length < 5) {
        respond.failure("Password must be more than 5 characters");
    }

    var find_data = function() {
        var collection = Promise.promisifyAll(user_database.collection('users'));
        log.debug('2');
        log.debug('post params!', req.body);
        return collection.countAsync({
            username: post_params.username
        });
    };

    var add_record = function() {
        var collection = Promise.promisifyAll(user_database.collection('users'));
        return collection.insertAsync({
            username: post_params.username,
            password: post_params.password,
            date_created: new Date().getTime(),
            mentor: false,
            role: "basic",
            severity_grade: "Low"
        });
    };

    var check_if_user_exists = function(count) {
        if (count >= 1) {
            respond.failure("Username already exists");
        }
        return count;
    };

    return MongoClient.connectAsync(database.connection)
        .then(function(db) {
            user_database = db;
        })
        .then(find_data)
        .then(check_if_user_exists)
        .then(add_record)
        .then(function(result) {
            respond.success("User " + post_params.username + ' added');
        })
        .caught(function(err) {
            respond.failure('Could not add user', 'Error adding record in database: (' + err + ')');
        });
};