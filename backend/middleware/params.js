var utilities_general = require('../utilities/utilities.general.js');
var url = require('url');
var _ = require('lodash');

module.exports = function(app) {

    var required_params = {
        "/referrals/insert": {
            "post": ['email', 'phone', 'details']
        }
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

        if (required_params[req.originalUrl] && required_params[req.originalUrl].post) {
            _.each(required_params[req.originalUrl].post, function(param) {
                if (!req.body[param]) {
                    respond.failure('Missing ' + param + ' parameter in request');
                    errors_found = true;
                }
            });
        }

        if (!errors_found) next();

    });
};