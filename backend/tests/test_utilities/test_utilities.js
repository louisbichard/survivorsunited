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

    hasResultProperty: function(err, res, body, property, type) {
        body = JSON.parse(body);

        if (!body.result || body.result[property] === undefined) {
            throw new Error('Expected result.' + property + ' to exist ');
        }

        if (typeof body.result[property] !== type) {
            throw new Error('Expected ' + property + ' property of result to be of type' + type);
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