var colors = require('colors');
var _ = require('lodash');
var log = require('../../../backend/utilities/logger.js');
var database = require('../../../backend/utilities/database.js');
var AUTH_COOKIE = "544a4603c639328a1adc6723";
var EVENT_ID = database.getObjectID("544a8c615161f3314349f1ab");
var USER_ID = database.getObjectID("544b7656702a87d900b4392f");
var FAKE = database.getObjectID("544ce6a966509b000046d959");


/**
 * [getSubObjects description]
 * @param  {[type]} body   - an object of any depth
 * @param  {[type]} string - A string delimited by decimals to denote another layer in an object,
 *                           Works also with no decimals
 * @return {[type]}        "result.result" will get "hello" from: {result: {result: "hello"}}
 */
var getSubObjects = function(body, string) {
    return _.reduce(string.split('.'), function(prev, curr) {

        //ENSURE SUB OBJECT EXISTS
        if (!prev[curr]) {
            throw new Error('Sub object not found in test');
        }

        return prev[curr];
    }, body);
};

module.exports = {

    // CONSTANTS
    DELAY: 500,

    //DEPRECATED, PLEASE REMOVE (DO NOT USE)
    hasAppropriateProperties: function(err, res, body) {
        body = JSON.parse(body);

        if (body.success === false && !body.error_message) {
            throw new Error('API returning incorrect properties (no error_message)');
        }

        if (body.success === true && !body.result) {
            throw new Error('API returning incorrect properties (no result)');
        }

    },

    hasResultProperty: function(err, res, body, property, type, val) {
        body = JSON.parse(body);

        if (!body.result) {
            throw new Error('API does not return success');
        }

        //CHECK PROPERTY EXISTS
        if (!body.result || body.result[property] === undefined) {
            throw new Error('Expected result.' + property + ' to exist ');
        }

        //CHECK TYPEOF THE PROPERTY
        if (typeof body.result[property] !== type) {
            throw new Error('Expected ' + property + ' property of result to be of type' + type);
        }

        //CHECK VALUE OF THE PROPERTY
        var value = body.result[property];
        if (val && body.result[property] !== val) {
            throw new Error('Expected value of ' + property + ' to be: ' + val + '  instead got ' + value);
        }

    },

    propertyHasLength: function(err, res, body, property, length) {
        // FORMAT REQUEST BODY
        body = JSON.parse(body);

        //GET SUB OBJECT IF NECESSARY
        var value = getSubObjects(body, property);

        //CHECK PROPERTY EXISTS
        if (!value) {
            throw new Error('cannot check length of undefined');
        }

        var property_length = value.length;

        //CHECK PROPERTY IS A NUMBER
        if (!value instanceof Array) {
            throw new Error('Can only check the length of arrays');
        }

        //CHECK PROPERTY LENGTH IS AS EXPECTED
        if (property_length !== length) {
            var output = [
                "expected:",
                property,
                "to be of length",
                length,
                "but found as",
                property_length
            ];
            throw new Error(output.join(' '));
        }

    },

    successIsFalse: function(err, res, body) {
        // FORMAT REQUEST BODY
        body = JSON.parse(body);

        // THROW ERROR IF TEST ISN'T FALSE
        if (body.success !== false) {
            throw new Error('Expected success to be false');
        }
    },

    successIsTrue: function(err, res, body) {
        //FORMAT REQUEST BODY
        body = JSON.parse(body);

        // THROW ERROR IF REST ISN'T FALSE
        if (body.success !== true) {
            throw new Error('Expected success to be true, error message: ' + body.error_message);
        }
    },

    hasErrorMessage: function(err, res, body, message) {
        body = JSON.parse(body);

        if (body.error_message !== message) {
            throw new Error('Error message is incorrect, expected: ' + message + ' but got: ' + body.error_message);
        }
    },

    hasSuccessMessage: function(err, res, body, message) {
        //FORMAT REQUEST BODY
        body = JSON.parse(body);

        //THROW ERROR IF MESSAGE IS NOT EXPECTED
        if (body.result !== message) {
            var output = [
                'Success message is incorrect, expected:',
                message,
                ' but got: ',
                body.result,
                'error message was:',
                body.error_message
            ];
            throw new Error(output.join('\n'));
        }
    },

    // SET OUTGOING REQUEST AS MONGO AUTH COOKIE CONSTANT
    setAuthCookie: function(outgoing) {
        outgoing.headers['Cookie'] = 'auth=' + AUTH_COOKIE;
        return outgoing;
    },

    // GET CONSTANT MONGO ID
    getAuthCookie: function() {
        return database.getObjectID(AUTH_COOKIE);
    },

    //COLLECTION OF DUMMY ID'S FOR STUBBING TESTS
    dummy_id: {

        //USE EVENTS AS EVENT IS A RESERVED WORD
        EVENT_ID: EVENT_ID,
        USER_ID: USER_ID,
        FAKE: FAKE
    }
};