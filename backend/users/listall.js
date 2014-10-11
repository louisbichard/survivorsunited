//USERS API
//------------------
// ENDPOINT /user/...

//REQUIRED LIBRARIES
//------------------
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _ = require('lodash');
var moment = require('moment');



module.exports = function() {

    return fs.readFileAsync('./database/users.json')
        .then(function(data) {
        	return data;
        })        
        .catch(SyntaxError, function(e) {
            console.error("file contains invalid json");
        }).error(function(e) {
            console.error("unable to read file, because: ", e.message);
        });
};