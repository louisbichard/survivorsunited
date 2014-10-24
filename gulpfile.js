var gulp = require('gulp');
var shell = require('gulp-shell');
var database = require('./backend/utilities/database.js');
var run_endpoint_tests = require('./backend/tests/test_utilities/run_endpoint_tests.js');

gulp.task('default', shell.task([
    //SETUP TEST 
    //----------

    //SET DATABASE ENVIRONMENT VARIABLE AS SU
    "set -x DATABASE su",

    //SETUP DATABASE DATA
    "nodemon backend/index.js",
]));

gulp.task('test-endpoints', function() {
    run_endpoint_tests.run();
});

gulp.task('test-http', shell.task([
    //SET DATABASE ENVIRONMENT VARIABLE AS TEST
    "set -x DATABASE test",

    //START SERVER AS BACKGROUND MODULE
    "forever start backend/index.js",

    //ADD SOME OUTPUT TO THE TOP OF THE TESTS
    "node backend/tests/test_utilities/test.output.js",

    //RUN
    "vows backend/tests/test_endpoints/*.test.js",

    //BREAK DOWN DATABASE
    //"node backend/tests/test_utilities/clear.database.js",

    //SET DATABASE ENVIRONMENT VARIABLE BACK TO SU
    "set -x DATABASE su",

    //STOP ALL FOREVER RUNNING PROCESSES
    "forever stopall"
]));

gulp.task('test-backend', shell.task([
    "node backend/tests/test_units/test.output.js",
    "jasmine-node backend/tests/test_units  --color",
]));

gulp.task('test-frontend', shell.task([
    "jasmine-node tests --color"
]));