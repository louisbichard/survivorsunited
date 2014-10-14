//USERS API
//------------------
// ENDPOINT /user/...

//REQUIRED LIBRARIES
//------------------
var Promise = require('bluebird');
var db_connection = require('../utilities/database.js');

module.exports = function() {

    return db_connection('users')
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