var add_session = require('../sessions/sessions.add.js');

module.exports = function(app) {

    app.all('*', function(req, res, next) {
        console.log('session of user:' + req.cookies.auth);

        if (req.cookies.auth === undefined) {
            add_session(req, res)
                .then(function() {
                    next();
                })
                .caught(function() {
                    console.log('Error in writing cookie! (cookie.js:12)');
                });
        } else {
            next();
        }
    });
};