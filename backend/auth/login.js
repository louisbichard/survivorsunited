//LOGIN API
//------------------
// ENDPOINT /user/login

//REQUIRED LIBRARIES
//------------------
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _ = require('lodash');
var sessions = require('./sessions.js');


module.exports = function(res, req) {
    var post_params = req.body || {};    


    //VALIDATION
    //----------
    // Username and Password must be present
    if (!post_params.username || !post_params.password) {
        return Promise.reject({
            success: false,
            error: "no username or password specified"
        });
    }

    return fs.readFileAsync('./database/users.json', 'utf-8')
        .then(function(data) {
            var users = JSON.parse(data);

            //VALIDATION
            //----------
            // Ensure username exists
            var username_exists = _.filter(users, function(item) {
                return item.username === post_params.username;
            });

            if (!username_exists.length > 0) {
                return {
                    success: false,
                    error: "Account does not exist"
                };
            }

            //VALIDATION
            //----------
            // Ensure username & password match
            var user_id;
            var user_index;
            _.each(users, function(user, index) {
                if (user.password === post_params.password && user.username === post_params.username) {
                    user_id = user.id;
                    user_index = index;
                }
            });

            if (!user_id) {
                return {
                    success: false,
                    error: "Password does not match username"
                };
            }            
            

            sessions.addSession(user_id, req.cookies.auth);

            return {success: "true"};


        }).caught(function(e) {
            return {
                success: false,
                error: "unable to read file, because: " + e.message
            }
        });

    //TERMINATE THE API


};