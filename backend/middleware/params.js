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
        // SPLIT AND IGNORE GET PARAMETERS IF REQUIRED
        var path = req.originalUrl.split("?")[0];

        var params_module = {
            // SEPARATE OUT INTO POST REQUESTS
            convertBooleanValues: function(boolean_values) {
                return _.each(boolean_values, function(key) {
                    var bool = req.body[key];
                    if (bool === "0" || bool === "1" || bool === 0 || bool === 1 || bool === true || bool === false) {
                        req.body[key] = Number(req.body[key]);
                    } else {
                        respond.failure('Expected boolean value for parameter ' + "'" + key + "'");
                        errors_found = true;
                    }
                });

            },
            updateObjectIDs: {
                get: function(parameters) {
                    return _.each(parameters, function(key) {
                        var id = req.GET[key];
                        try {
                            req.GET[key] = db.getObjectID(id);
                        } catch (e) {
                            respond.failure('Incorrect ID passed');
                            errors_found = true;
                        }
                    });
                },
                post: function(parameters) {
                    return _.each(parameters, function(key) {
                        var id = req.body[key];
                        try {
                            req.body[key] = db.getObjectID(id);
                        } catch (e) {
                            respond.failure('Incorrect ID passed');
                            errors_found = true;
                        }
                    });
                }
            },
            getObjectIDs: function(property_name, params_object) {
                var test = _.chain(params_object)
                    .reduce(function(prev, value, key) {
                        if (value.type === property_name) prev.push(key);
                        return prev;
                    }, [])
                    .value();
                return test;
            }
        };

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

                // NOTE: CHECK IF UNDEFINED AS 0 OR FALSE IS ALLOWED
                if (req.body[param] === undefined) {
                    respond.failure('Missing ' + param + ' parameter in request');
                    errors_found = true;
                }
                // TODO: ENSURE THAT PARAMETER IS OF THE CORRECT TYPE
                // CONVERT BOOLEANS IF NECESSARY
            });

            // GET JUST THE OBJECT ID'S
            var object_ids = params_module.getObjectIDs("object_id", routes[path].post.parameters);
            params_module.updateObjectIDs.post(object_ids);

            var booleans = params_module.getObjectIDs("boolean", routes[path].post.parameters);

            params_module.convertBooleanValues(booleans);


        } else if (routes[path] && routes[path].get && routes[path].get.parameters) {
            var object_ids = params_module.getObjectIDs("object_id", routes[path].get.parameters);
            params_module.updateObjectIDs.get(object_ids);
        }

        if (!errors_found) next();

    });
};