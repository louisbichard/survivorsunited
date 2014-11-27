// Response utility
var colors = require('colors');
var log = require('./logger.js');

module.exports = function(args) {

    //VALIDATION: ENSURE args are specified
    if (!args) throw new Error('No arguements passed to response utility');

    //VALIDATION: ENSURE req, res & filename are specified    
    if (!args.req) throw new Error('No request object passed to response utility');
    if (!args.res) throw new Error('No response object passed to response utility');
    if (!args.file) throw new Error('No request object passed to response utility');

    //VALIDATION: ENSURE arguments are correct file type
    if (((typeof args.req) !== 'object')) throw new Error('Incorrect type for request passed to response utility');
    if (((typeof args.res) !== 'object')) throw new Error('Incorrect type for response passed to response utility');
    if (((typeof args.file) !== 'string')) throw new Error('Incorrect type for request passed to response utility');

    return {
        rejectAnon: function() {
            var message = 'User is not authenticated';

            var construct_response = JSON.stringify({
                success: false,
                error_message: message
            });

            // CHECK REQUEST OBJECT FOR USER CREDENTIALS
            if (!args.req.user) {
                args.res.end(construct_response);
            }
        },
        success: function(message) {
            var construct_response = JSON.stringify({
                success: true,
                result: message
            });

            args.res.end(construct_response);
        },
        failure: function(friendly_message, technical_message) {
            var construct_response = JSON.stringify({
                success: false,
                result: friendly_message
            });
            args.res.end(construct_response);
        },
        generalFailure: function(technical_message) {

            var error_message = [
                '\n',
                'General failure: '.red,
                technical_message.toString()
                .yellow,
                '\n',

                'Location: '.blue,
                args.file.yellow,
                '\n'
            ];
            var error_message_joined = error_message.join('');

            // THROW ERROR TO CONSOLE
            console.log(error_message_joined);
        }
    };
};