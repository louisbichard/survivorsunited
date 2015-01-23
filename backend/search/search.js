var db = require('../utilities/database.js');
var log = require('../utilities/logger.js');
var Promise = require('bluebird');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    // MONGO QUERIES
    // 
    var queries = {
        // CASE INSENSITIVE QUERY
        substring: {
            $regex: ".*" + req.GET.query + ".*",
            $options: "i"
        }
    };

    if (!req.GET.query) {
        respond.failure('No search query provided');
    } else {
        return Promise.props({
                events: db.find('events', [{
                    "title": queries.substring
                }]),
                tasks: db.find('tasks', [{
                    "title": queries.substring
                }]),
                users: db.find('users', [{
                    $or: [{
                        "first_name": queries.substring
                    }, {
                        "last_name": queries.substring
                    }, {
                        "username": queries.substring
                    }]
                }])
            })
            .then(respond.success)
            .caught(function(err) {
                log.debug(err);
                respond.failure('Could not perform search', err);
            });
    }

};