var db = require('../utilities/database.js');
var log = require('../utilities/logger.js');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    // MONGO QUERIES
    // 
    // 
    console.log('get request', req.GET);

    var queries = {
        // CASE INSENSITIVE QUERY
        substring: {
            $regex: ".*" + req.GET.query + ".*",
            $options: "i"
        }
    };


    var db_query = {
        events: db.find('events', [{
            "title": queries.substring
        }]),
        tasks: db.find('tasks', [{
            "title": queries.substring
        }]),
        users: [] // SET IT TO DEFAULT TO JUST RETURN AN EMPTY ARRAY
    };
    if (req.user.role === 'Mentor' || req.user.role === 'Admin') {
        // SEND USERS IF INTERNAL
        db_query = _.extend(db_query, {
            users: db.find('users', [{
                $or: [{
                    "first_name": queries.substring
                }, {
                    "last_name": queries.substring
                }, {
                    "username": queries.substring
                }]
            }])
        });
    }

    if (!req.GET.query) {
        respond.failure('No search query provided');
    } else {
        return Promise.props(db_query)
            .then(respond.success)
            .caught(function(err) {
                log.debug(err);
                respond.failure('Could not perform search', err);
            });
    }

};