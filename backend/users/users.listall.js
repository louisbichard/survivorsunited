// ENDPOINT /user/listall

var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb")).MongoClient;
var database = require('../utilities/database.js');
var utility_date = require('../utilities/utilities.dates.js');
var _ = require('lodash');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var get_user_db = function(db) {
        var collection = Promise.promisifyAll(db.collection('users'));
        return Promise.props({
            find: collection.findAsync(),
            count: collection.countAsync()
        });
    };

    var get_user_data = function(result) {
        var count = result.count;
        var find = Promise.promisifyAll(result.find);

        return find.toArrayAsync()
            .then(function(users) {
                return {
                    users: format_dates(users),
                    count: count
                };
            });
    };

    var format_dates = function(users) {
            return _.map(users, function(user) {
            console.log(user);
            user.date_created = utility_date.unixToReadable(user.date_created);
            return user;
        });
    };

    var send_result = function(vals) {
        respond.success(vals);
    };

    return MongoClient.connectAsync(database.connection)
        .then(get_user_db)
        .then(get_user_data)
        .then(send_result)
        .caught(function(err) {
            respond.failure('Could not list users!', err);
        });

};