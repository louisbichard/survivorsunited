utilities_general = require('../utilities/utilities.general.js');
url = require('url');

module.exports = function(app) {

    app.all('*', function(req, res, next) {
        var respond = require('../utilities/utilities.respond.js')({
            req: req,
            res: res,
            file: __dirname + __filename
        });

        var allowed_urls = [
            "/user/current",
            "/auth/login",
            "/user/add",
            "/user/current"
        ];

        if (!req.user && !utilities_general.inArray(allowed_urls, req.originalUrl.replace(/[?]/g, '')))
        // IF ANON AND NOT AN ANON URL
        {
            console.log(req.originalUrl);
            // TODO: ADD IN THE RESPOND BACK AND REMOVE THE NEXT
            next();
            //respond.notAuthenticated();
        } else {
            next();
        }

    });
};