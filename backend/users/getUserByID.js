//GET USER BY ID API

//REQUIRED LIBRARIES
//------------------
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _ = require('lodash');

module.exports = function(user_id) {
    return fs.readFileAsync('./database/users.json', 'utf-8')
        .then(function(current_user_db) {

            current_user_db = JSON.parse(current_user_db);

            // **TODO** ADD VALIDATION FOR NO ID PASSED IN! 

            var user_found;
            _.each(current_user_db, function(user){
                if(user.id === user_id) { 
                    user_found = user;
                }
            });

            return user_found;
        });
};