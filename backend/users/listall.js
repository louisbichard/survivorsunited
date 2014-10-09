//USERS API
//------------------
// ENDPOINT /user/...

//REQUIRED LIBRARIES
//------------------
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));



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