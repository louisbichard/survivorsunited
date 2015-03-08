var _ = require('lodash');
var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var db = require('../utilities/database.js');
var log = require('../utilities/logger.js');
var email = require('../utilities/utilities.email.js');

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

    var send_confirmation_email = function(result) {
        return email.sendEmail({
            'subject': 'Welcome to Survivors United ' + result[0].username,
            'template': 'backend/email/templates/welcome.html',
            'to': ['contact@louisjohnbichard.co.uk'] // TODO: Send this to the email specified
        });
    };

    return db.insert('users', [_.extend(data_to_insert, post_params)])
        .then(function(result) {
            // TODO: ASSIGN TASKS TO THIS ID
            var user_id = result._id;
            return result;
        })
        .then(send_confirmation_email)
        .then(function() {
            return respond.success("User " + post_params.username + ' added');
        })
        .caught(function(err) {
            respond.failure('Could not add user', 'Error adding record in database: (' + err + ')');
        });


};