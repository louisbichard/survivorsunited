//ENDPOINT /user/add

// TODO: ADD TESTS
// 
// 1) ADD CHECK FOR SUCCESS MESSAGE

var _ = require('lodash');
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

    var data_to_insert = {
        date_created: new Date().getTime(),
        mentor: false,
        role: "Basic",
        severity_grade: "Low"
    };

    return db.insert('users', [_.extend(data_to_insert, post_params)])
        .then(function(result) {
            var user_id = result._id;
            return respond.success("User " + post_params.username + ' added');
        })
        .caught(function(err) {
            respond.failure('Could not add user', 'Error adding record in database: (' + err + ')');
        });


};