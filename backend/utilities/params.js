var utilities_general = require('./utilities.general.js');

module.exports = function(app) {

    app.all('*', function(req, res, next) {
        req.GET = utilities_general.GET_params(req);

        next();
    });
};