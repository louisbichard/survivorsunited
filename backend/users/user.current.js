// ENDPOINT /auth/isAuthenticated
var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require("mongodb"))
    .MongoClient;
var database = require('../utilities/database.js');

module.exports = function(req, res) {
    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    //TODO: ADD VALIDATION
    var current_user = req.user;
    if (current_user) respond.success(current_user);
    else respond.failure('user isn\'t authenticated');

};