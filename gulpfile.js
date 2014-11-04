var gulp = require('gulp');
var shell = require('gulp-shell');
var database = require('./backend/utilities/database.js');
var run_endpoint_tests = require('./tests/backend/test_utilities/run_endpoint_tests.js');

gulp.task('default', shell.task([
    //SETUP TEST 
    //----------

    //SET DATABASE ENVIRONMENT VARIABLE AS SU
    "set -x DATABASE su",

    //SETUP DATABASE DATA
    "nodemon backend/index.js"
]));

gulp.task('test-backend', function() {
    run_endpoint_tests.run();
});

gulp.task('test-frontend', shell.task([
    "./node_modules/karma/bin/karma start"
]));