var colors = require('colors');

module.exports = {
    heading: function(text) {
        console.log(text.red);
    },
    general: function(text, data) {
        console.log(text.blue, data, '\n');
    },
    success: function(text, data) {
        text = text.green;
        if (data) {
            console.log(text.underline, data);
        } else {
            console.log(text.underline);
        }
    },
    failure: function(text, err) {
        if (!err) err = "";
        text = text.red;
        console.log(text.underline, err);
    },
    debug: function(text, data) {
        if (!data) {
            console.log('Debugging'.bgBlue.white, text, '\n');
        } else {
            text = 'Debugging ('.white + text.white + ') '.white;
            console.log(text.bgBlue, data, '\n');
        }
    },
    error: function(text) {
        console.log("Error: ".white.bgRed, text, '\n');
    },

    //DEPRECATED, USE TEST SUBMODULE
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
        failed: function(endpoint, err) {
            var text = "Test failed in " + endpoint;
            console.log(text.white.bgRed, err, '\n');
        },
        databaseChange: function(text) {
            text = "Database:: " + text;
            console.log(text.cyan);
        },
        endpoint: function(text) {
            text = '---------------' + text.blue +  '---------------';
            console.log(text.blue);
        },
        hasTODO: function() {
            console.log('Suite has unimplemented tests'.yellow.underline);
        },
        describe: function(text) {
            text = "testing " + text;
            console.log(text.magenta);
        },
        complete: function(num_tests) {
            var text = "Testing complete! Completed: ";
            console.log(text.green.underline, num_tests, '\n');
        }
    }
};