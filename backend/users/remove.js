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

    //VALIDATION
    //-------------------------------------------------
    // Username and Password must be present
    if (!post_params.id ) {
        return Promise.reject({
            success: false,
            error: "no id specified"
        });
    }

    return fs.readFileAsync('./database/users.json', 'utf-8')
        .then(function(data) {
            data = JSON.parse(data);

            var old_length = data.length
            data = _.filter(data, function(user) {
                return (user.id !== post_params.id);
            });

            //VALIDATION
            //-------------------------------------------------
            // Username is taken
            if (old_length === data.length) {
                return {
                    success: false,
                    error: "ID not found"
                };
            }

            return fs.writeFileAsync('./database/users.json', JSON.stringify(data))
                .then(function() {
                    return {
                        success: true,
                        message: "Account " + post_params.id + " successfully removed"
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
