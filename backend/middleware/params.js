var utilities_general = require('../utilities/utilities.general.js');
var url = require('url');
var _ = require('lodash');
var db = require('../utilities/database.js');

module.exports = function(app) {

    var required_params = {
        "/referrals/insert": {
            "post": {
                'email': 'string',
                'phone': 'string'
            }
        },
        "/referrals/update": {
            "post": {
                'id': 'object_id',
                'is_open': 'string'
            },
        },
        "/task/add": {
            "post": {
                'title': 'string',
                'assignees': 'array',
                'description': 'string',
                'actions': 'array'
            }
        },
        "/user/add": {
            "post": {
                'username': 'string',
                'password': 'string'
            }
        },

    };

    app.all('*', function(req, res, next) {

        var errors_found = false;

        var respond = require('../utilities/utilities.respond.js')({
            req: req,
            res: res,
            file: __dirname + __filename
        });

        // EXTEND THE REQUEST OBJECT WITH THE GET PARAMS
        req.GET = utilities_general.GET_params(req);

        // CHECK GET REQUESTS
        // TODO: MAYBE ADD A WARNING HERE IF THE REQUEST HAS NO SETUP
        var path = req.originalUrl;

        // TODO: EXTEND FOR GET REQUESTS

        if (required_params[path] && required_params[path].post) {

            var params = _.keys(required_params[path].post);

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
                _.chain(required_params[path].post)
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