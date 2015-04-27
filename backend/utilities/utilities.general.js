var url = require('url');
var log = require('./logger.js');

module.exports = {
    GET_params: function(req) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;        
        return query;
    },

    /**
     * Test whether a value is in an array
     * @param  {Array} array  - An array to search
     * @param  {String} value - string or number to look for in array
     * @return {Binary} - true or false
     */

    //TODO: ADD UNIT TEST
    inArray: function(array_of_values, value) {
        if (array_of_values.length === 0 || value === "") {
            return false;
        }
        return array_of_values.indexOf(value) > -1;
    }
};