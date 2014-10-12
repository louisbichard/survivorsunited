var sessions = require('./auth/sessions');
var uuid = require('node-uuid');
var _ = require('lodash');


/** 
 * [exports - Takes all requests and adds cookies for those without session ID's]
 * @param  {Object} app - Express app object
 */
module.exports = function(app) {


    /** 
     * [description]
     * @param  {Object}   req
     * @param  {Object}   res
     * @param  {Function} next
     * @return {None}
     */
    app.all('*', function(req, res, next) {

        // SET COOKIE FOR ALL REQUESTS WITHOUT ONE
        console.log('session of user:' + req.cookies.auth);
        if (req.cookies.auth === undefined) {
            console.log('no cookie!');

            //GENERATE COOKIE
            var cookie_value = uuid.v4();

            // SET COOKIE
            res.cookie('auth', cookie_value, {
                httpOnly: true,
                maxAge: 900000
            });

            sessions.setCookieSession(cookie_value)
            .caught(function(){
                // **TODO:** Implement better error handling
                console.log('error in writing cookie!');
            });

        }

        // COMPLETE THE ASYNC CALL
        next();
    });


}