//REQUIRED LIBRARIES
//------------------
var colors = require('colors');
var uuid = require('node-uuid');
var _ = require('lodash');
var log = require('../utilities/logger.js');
var fs = require('fs');

var runEndpoint = function(req, res, next, location, io) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    // REMOVE THE LEADING SLASHES FROM THE LOCATION PATH FOR MORE READABLE API OUTPUT
    log.general('EP: ', location.blue);

    if (!location || !_.isString(location)) {
        throw new Error('location was not found, or incorrect type when passed to(runEndpoint in backend routes');
    }

    // CALL API
    try {
        return require(location)(req, res, io);
    } catch (err) {
        log.debug(err);
        require('../utilities/log.server.error.js')(req, res, {
                location: location,
                anonymous: !req.user,
                err: JSON.stringify(err)
            })
            .then(function() {
                respond.failure('Internal API failure');
            })
            .caught(function() {
                respond.failure('Internal API failure');
            });
    }
};

//API ENDPOINTS
module.exports = function(app, io) {

    // FETCH THE ROUTE DETAILS
    var routes = JSON.parse(fs.readFileSync('backend/routes.json', 'utf8'));
        
        _.chain(routes)
        .keys()
        .each(function(key) {
            if (routes[key].post) app.post(key, _.partialRight(runEndpoint, routes[key].post.file_path, io));
            if (routes[key].get) app.get(key, _.partialRight(runEndpoint, routes[key].get.file_path, io));
        });
};