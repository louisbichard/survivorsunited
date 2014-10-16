// Response utility
var colors = require('colors');

module.exports = function(args) {

    //VALIDATION
    //----------
    // ENSURE req, res & filename are specified

    if (!args.req) throw new Error('No request object passed to response utility');
    if (!args.res) throw new Error('No response object passed to response utility');
    if (!args.file) throw new Error('No request object passed to response utility');


    //VALIDATION
    //----------
    // ENSURE arguments are correct file type

    if (((typeof args.req) !== 'object')) throw new Error('Incorrect type for request passed to response utility');
    if (((typeof args.res) !== 'object')) throw new Error('Incorrect type for response passed to response utility');
    if (((typeof args.file) !== 'string')) throw new Error('Incorrect type for request passed to response utility');

    return {
        success: function(message) {
            var construct_response = JSON.stringify({
                success: true,
                result: message
            });

            args.res.end(construct_response);
        },
        failure: function(friendly_message, technical_message) {
            var error_message = [
                '\n',
                'REST Failure: '.red,

                '(',
                friendly_message,
                ')',
                '\n',

                'technical_error: '.blue,
                technical_message.toString().yellow,
                '\n',

                'Location: '.blue,
                args.file.yellow,
                '\n'
            ];
            var error_message_joined = error_message.join('');

            // THROW ERROR TO CONSOLE
            console.log(error_message_joined);


            // TERMINATE REST API
            var construct_response = JSON.stringify({
                success: false,
                error_messsage: friendly_message
            });

            args.res.end(construct_response);
        },

        generalFailure: function(technical_message) {

            var error_message = [
                '\n',
                'General failure: '.red,
                technical_message.toString().yellow,
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