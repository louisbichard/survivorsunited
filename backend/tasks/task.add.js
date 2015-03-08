// ENDPOINT /events/listall
// 

// TODO: TEST
// 1) ONLY ALLOW AUTHENTICATED USERS

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb"))
    .MongoClient;
var database = require('../utilities/database.js');
var _ = require('lodash');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var post_params = req.body;
    var watchers = [];

    // VALIDATE CORRECT FORMAT
    var assignee_not_array = _.reduce(post_params, function(prev, val, key) {
        if (key === 'assignees') {
            try {
                post_params.assignees = JSON.parse(val);
            } catch (e) {
                prev = false;
            }
        }
        return prev;
    }, true);

    // VALIDATE
    if (assignee_not_array) respond.failure('Assignees must be an array');
    else {
        // SETUP ASSIGNEES FIELD 
        post_params.assignees = _.reduce(post_params.assignees, function(prev, curr) {
            prev[curr] = {
                status: 'open',
                rating: {}
            };
            return prev;
        }, {});

        // ADD TO DB
        return database.insert('tasks', [{
                title: post_params.title,
                description: post_params.description,
                assignees: post_params.assignees,
                actions: post_params.actions,
                date_created: new Date()
                    .getTime()
            }, {
                upsert: true
            }])
            .then(respond.success)
            .caught(function(err) {
                respond.failure('Could not add task', err);
            });
    }

};