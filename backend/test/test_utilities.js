var colors = require('colors');
var _ = require('lodash');

module.exports = {
    successIsTrue: function(err, res, body) {
        body = JSON.parse(body);
        if (body.success === false) {
            throw new Error('expected success to be true, recieved false');
        }
        return body.success;
    },
    successIsFalse: function(err, res, body) {
        body = JSON.parse(body);
        if (body.success === true) {
            throw new Error('expected success to be false, recieved true');
        }
        return body.success;
    },
    hasProperty: function(err, res, body, name, expected_type) {
        body = JSON.parse(body);

        // CHECK THE RESPONSE HAS THE VALUE:
        if (!body[name]) {
            throw new Error('Expected JSON result did not contain value: ' + name);
        }

        // CHECK THE RESPONSE HAS THE TYPE:
        var returned_type = typeof body[name];

        if (returned_type !== expected_type) {
            throw new Error('Expected property ' + name + ' to be of type ' + expected_type + ', instead got: ' + returned_type);
        }

        return true;
    },
    colourful_log: function(api_name, option) {
        if (option) {
            console.log(api_name.green[option]);
        } else {
            console.log(api_name.magenta);
        }
    }
};