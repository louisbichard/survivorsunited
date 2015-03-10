var utilities_general = require('../utilities/utilities.general.js');
var url = require('url');
var _ = require('lodash');
var db = require('../utilities/database.js');
var fs = require('fs');
var routes = JSON.parse(fs.readFileSync('backend/routes.json', 'utf8'));

var validation_functions = {
    "string_less_than_5": function(param) {
        return param.length >= 5;
    }
};

// EXTEND THE REQUEST OBJECT WITH THE GET PARAMS
module.exports = function(app) {
    app.all('*', function(req, res, next) {
        var errors_found = false;
        var respond = require('../utilities/utilities.respond.js')({
            req: req,
            res: res,
            file: __dirname + __filename
        });

        // TODO: MAYBE ADD A WARNING HERE IF THE REQUEST HAS NO SETUP
        var path = req.originalUrl;

        // TODO: EXTEND FOR GET REQUESTS
        if (routes[path] && routes[path].post && routes[path].post.parameters) {

            var params = _.keys(routes[path].post.parameters);

            _.each(params, function(param) {

                // IF VALIDATION IS REQUIRED, RUN IT
                var parameter_validation = routes[path].post.parameters[param].validation;


                // RUN PARAMETER VALIDATION OVER THE TECHNOLOGY
                if (parameter_validation) {
                    var function_name = parameter_validation.function_name;
                    var is_valid = validation_functions[function_name](req.body[param]);

                    // TODO: ENSURE THAT ALL VALID ARGUMENTS ARE PROVIDED
                    if (!is_valid) respond.failure(parameter_validation.fail_message);
                }

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