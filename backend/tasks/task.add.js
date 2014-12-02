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

    respond.rejectAnon();

    var post_params = req.body;
    var watchers = [];

    //VALIDATION: ENSURE VALUES ARE SET
    var missing_params = _.reduce(['title', 'assignees', 'description'], function(prev, field, index) {
        if (!post_params[field]) prev.push(field);
        return prev;
    }, []);

    // VALIDATE CORRECT FORMAT
    var assignee_not_array = _.reduce(post_params, function(prev, val, key) {
        if (key === 'assignees') {
            try {
                post_params.assignees = JSON.parse(val);
            }
            catch (e) {
                prev = false;
            }
        }
        return prev;
    }, true);

    // VALIDATE
    if (missing_params.length > 0) respond.failure(missing_params.join('/') + ' fields missing');
    if (assignee_not_array) respond.failure('Assignees must be an array');
    else {
        // SETUP ASSIGNEES FIELD 
        post_params.assignees = _.reduce(post_params.assignees, function(prev, curr) {
            prev[curr] = {
                status: 'open'
            };
            return prev;
        }, {});

        // ADD TO DB
        return database.insert('tasks', [{
                title: post_params.title,
                description: post_params.description,
                assignees: post_params.assignees,
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