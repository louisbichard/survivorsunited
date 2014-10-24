var colors = require('colors');

module.exports = {
    heading: function(text) {
        console.log(text.red);
    },
    general: function(text) {
        console.log(text.blue);
    },
    success: function(text) {
        text = text.green;
        console.log(text.underline);
    },
    failure: function(text) {
        text = text.red;
        console.log(text.underline);
    },
    debug: function(text, data) {
        text = 'Debugging ('.white + text.white + ') '.white;
        console.log(text.bgBlue, data, '\n');
    },
    error: function(text) {
        console.log("Error: ".white.bgRed, text, '\n');
    },
    testFailed: function(err) {
        console.log("Test failed: ".white.bgRed, err, '\n');
    },
    promiseCaught: function(text, err) {
        console.log(text.white.bgRed, err, '\n');
    },
    space: function() {
        console.log('\n');
    },
    test: {
        databaseChange: function(text) {
            text = "Datbase:: " + text;
            console.log(text.cyan);
        },
        endpoint: function(text) {
            console.log(text.blue);
        },
        describe: function(text) {
            console.log(text.magenta);
        }
    }
};


/*
 log.test.endpoint(test_endpoint);

          log.test.describe('Testing general logout');
  var log = require('../../utilities/logger.js');
*/