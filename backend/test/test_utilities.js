var colors = require('colors');
var _ = require('lodash');

module.exports = {

    hasAppropriateProperties: function(err, res, body) {
        body = JSON.parse(body);

        if (body.success === false && !body.error_message) {
            throw new Error('API returning incorrect properties (no error_message)');
        }

        if (body.success === true && !body.result) {
            throw new Error('API returning incorrect properties (no result)');
        }

    },

    colourful_log: function(api_name, option) {
        if (option) {
            console.log(api_name.green[option]);
        } else {
            console.log(api_name.magenta);
        }
    }
};