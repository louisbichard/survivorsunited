var utilities_general = require('../utilities/utilities.general.js');
var url = require('url');
var _ = require('lodash');
var db = require('../utilities/database.js');
var fs = require('fs');


var validation_functions = {
    "string_less_than_5": function(param) {
        return param.length >= 5;
    }
};

// EXTEND THE REQUEST OBJECT WITH THE GET PARAMS
module.exports = function(app) {
    app.all('*', function(req, res, next) {
        var respond = require('../utilities/utilities.respond.js')({
            req: req,
            res: res,
            file: __dirname + __filename
        });

        var params_module = {
            init: function() {
                this.checkAllRequiredParametersArePresent();
                this.checkAgainstDefinedTypes();
            },
            checkAgainstDefinedTypes: function() {
                var passed_parameters = this.apiParameters();
                var expected_params = this.getExpectedParameters.raw();
                _.each(expected_params, function(value, key) {

                    // BEGIN TO TYPE CHECK WHERE NECESSARY
                    switch (value.type) {
                        case "object_id":
                            var object_id;
                            try {
                                object_id = db.getObjectID(passed_parameters[key]);
                            } catch (e) {
                                respond.failure('Incorrect ID passed');
                            }

                            params_module.updateRequestParameter(key, object_id);

                            break;
                        case "array":

                            /*try {
                                passed_parameters[key] = JSON.parse(passed_parameters[key]);
                            } catch(e) {
                                respond.failure('Expected an array for ' + key + ' parameter but it was incorrectly formatted');
                            }*/

                            /*if (!passed_parameters[key].isArray) {
                                respond.failure('Expected ' + key + ' paramater to be an array');
                            }*/

                            break;
                        case "boolean":
                            var is_valid = _.reduce(["0", "1", 0, 1, true, false], function(prev, comparator) {
                                if (passed_parameters[key] === comparator) return true;
                                return prev;
                            }, false);

                            if (!is_valid) respond.failure('Invalid Boolean value for ' + key + ' parameter passed');
                            else params_module.updateRequestParameter(key, Number(passed_parameters[key]));
                            break;
                    }

                });
            },
            method: req.method.toLowerCase(),
            getExpectedParameters: {
                raw: function() {
                    var curr_route_definition = params_module.route_definitions.current();
                    var curr_params = curr_route_definition[params_module.method].parameters;
                    return curr_params ? curr_params : {};
                },
                keys: function() {
                    return _.keys(this.raw());
                }
            },
            apiParameters: function() {
                return (this.method === "get") ? req.GET : req.body;
            },
            updateRequestParameter: function(property, value) {
                if (this.method === "get") {
                    req.GET[property] = value;
                } else {
                    req.body[property] = value;
                }
            },
            checkAllRequiredParametersArePresent: function() {
                var passed_parameters = this.apiParameters();
                _.each(this.getExpectedParameters.keys(), function(expected_param) {
                    // IF THE EXPECTED PARAM IS NOT IN THE REQUESTED PAYLOAD
                    if (passed_parameters[expected_param] === undefined) {
                        respond.failure('No ' + expected_param + ' parameter found but it is required');
                    }
                });

            },
            error_found: function() {
                respond.failure(' Some random error occurred ');
            },
            has_error: false,
            path: req.originalUrl.split("?")[0],
            route_definitions: {
                all: JSON.parse(fs.readFileSync('backend/routes.json', 'utf8')),
                current: function() {
                    return params_module.route_definitions.all[params_module.path];
                }
            }


        };

        var is_ico = params_module.path === "/favicon.ico";
        
        if ( (params_module.method === "get" || params_module.method === "post") && !is_ico) {
            params_module.init();
        }

        next();

    });
};