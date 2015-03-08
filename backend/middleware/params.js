var utilities_general = require('../utilities/utilities.general.js');
var url = require('url');
var _ = require('lodash');
var db = require('../utilities/database.js');
var fs = require('fs');

module.exports = function(app) {
    app.all('*', function(req, res, next) {
        var respond = require('../utilities/utilities.respond.js')({
            req: req,
            res: res,
            file: __dirname + __filename
        });

        var routes = JSON.parse(fs.readFileSync('backend/routes.json', 'utf8'));

        var errors_found = false;

        // EXTEND THE REQUEST OBJECT WITH THE GET PARAMS
        req.GET = utilities_general.GET_params(req);

        // CHECK GET REQUESTS
        // TODO: MAYBE ADD A WARNING HERE IF THE REQUEST HAS NO SETUP
        var path = req.originalUrl;

        // TODO: EXTEND FOR GET REQUESTS

        if (routes[path] && routes[path].post && routes[path].post.parameters) {

            var params = _.keys(routes[path].post.parameters);

            _.each(params, function(param) {
                // ENSURE THAT PARAMETER EXISTS
                if (!req.body[param]) {
                    respond.failure('Missing ' + param + ' parameter in request');
                    errors_found = true;
                }
                // TODO: ENSURE THAT PARAMETER IS OF THE CORRECT TYPE
                // CONVERT BOOLEANS IF NECESSARY
            });

            // GET JUST THE OBJECT ID'S
            var object_ids =
                _.chain(routes[path].post.parameters)
                .reduce(function(prev, value, key) {
                    if (value === "object_id") prev.push(key);
                    return prev;
                }, [])
                .value();

            // CONVERT ALL OBJECT ID'S WHERE NECESSARY
            _.each(object_ids, function(key) {
                var id = req.body[key];
                try {
                    req.body[key] = db.getObjectID(id);
                } catch (e) {
                    respond.failure('Incorrect ID passed');
                    errors_found = true;
                }
            });

        }

        if (!errors_found) next();

    });
};