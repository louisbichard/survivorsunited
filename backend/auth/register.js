//REGISTER API
//------------------
// ENDPOINT /user/register

//REQUIRED LIBRARIES
//------------------
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var uuid = require('node-uuid');
var _ = require('lodash');



module.exports = function(res, req) {
    var post_params = req.body;

    console.log(new Date());

    //VALIDATION
    //-------------------------------------------------
    // Username and Password must be present
    if (!post_params.username || !post_params.password) {
        return Promise.reject({
            success: false,
            error: "no username or password specified"
        });
    }

    //VALIDATION
    //-------------------------------------------------
    // Password insufficient complexity
    if (post_params.password.length < 5) {
        return Promise.reject({
            success: false,
            error: "Password must be more than 5 characters"
        });
    }

    return fs.readFileAsync('./database/users.json', 'utf-8')
        .then(function(data) {
            var new_data = JSON.parse(data);


            //VALIDATION
            //-------------------------------------------------
            // Username is taken
            var username_exists = _.filter(new_data, function(item) {
                return item.username === post_params.username;
            });

            if (username_exists.length > 0) {
                return {
                    success: false,
                    error: "Username is already taken"
                };
            }

            // Extend username and password with a timebased uuid
            _.extend(post_params, {
                ID: uuid.v1(),
                date_created: new Date().getTime(),
                role: "basic"
            });

            new_data.push(post_params);

            return fs.writeFileAsync('./database/users.json', JSON.stringify(new_data))
                .then(function() {
                    return {
                        success: true,
                        message: "Account " + post_params.username + " successfully registered"
                    }
                });

        }).caught(function(e) {
            return {
                success: false,
                error: "unable to read file, because: " + e.message
            }
        });

    //TERMINATE THE API


};