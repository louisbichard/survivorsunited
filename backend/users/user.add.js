//ENDPOINT /user/add

// TODO: ADD TESTS
// 
// 1) ADD CHECK FOR SUCCESS MESSAGE

var _ = require('lodash')
var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var db = require('../utilities/database.js');
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
    else if (post_params.password.length < 5) {
        respond.failure("Password must be more than 5 characters");
    } else {

        var data_to_insert = {
            date_created: new Date().getTime(),
            mentor: false,
            role: "Basic",
            severity_grade: "Low"
        };

        db.insert('users', [_.extend(data_to_insert, post_params)])
            .then(function(result) {
                respond.success("User " + post_params.username + ' added');
            })
            .caught(function(err) {
                console.log('in falure', err);
                respond.failure('Could not add user', 'Error adding record in database: (' + err + ')');
            });
    }

};