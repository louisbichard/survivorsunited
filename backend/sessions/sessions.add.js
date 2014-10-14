//USERS API
//------------------
// ENDPOINT /user/...

//REQUIRED LIBRARIES
//------------------
var Promise = require('bluebird');
var db_connection = require('../utilities/database.js');

module.exports = function(user_id, session_id) {

    return db_connection('sessions')
        .then(function(row) {
            return row;
        })
        .caught(function() {
            return {
                success: false,
                error_message: 'Failed to get users'
            };
        });
};