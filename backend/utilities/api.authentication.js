utilities_general = require('./utilities.general.js');
url = require('url');

module.exports = function(app) {

    app.all('*', function(req, res, next) {
        var respond = require('./utilities.respond.js')({
            req: req,
            res: res,
            file: __dirname + __filename
        });

        console.log(req.originalUrl);
        console.log(req.user);
        console.log(url.pathname)

        var allowed_urls = [
            "/user/current",
            "/auth/login",
            "/user/add"
        ];

        if (!req.user && !utilities_general.inArray(allowed_urls, req.originalUrl))
        // IF ANON AND NOT AN ANON URL
        {
            respond.notAuthenticated();
        } else {
            next();
        }

    });
};