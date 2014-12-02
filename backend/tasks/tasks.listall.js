// ENDPOINT /user/listall

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb"))
    .MongoClient;
var database = require('../utilities/database.js');
var utility_date = require('../utilities/utilities.dates.js');
var _ = require('lodash');
var utilities_general = require('../utilities/utilities.general.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    GET_params = utilities_general.GET_params(req);
    var query = {};

    if (GET_params.status) {
        query['assignees.' + req.user._id.toString() + '.status'] = GET_params.status;
    }

    if (GET_params.user === 'current') {
        query['assignees.' + req.user._id.toString()] = {
            $exists: true
        };
    }

    console.log(req.user._id);
    console.log(query);

    // ESTABLISH QUERY
    return database.find('tasks', [query])
        .then(respond.success)
        .caught(function(err) {
            respond.failure('Could not list all tasks', err);
        });

};