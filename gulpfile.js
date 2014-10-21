var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', function() {
    console.log('welcome to gulp!');
});

gulp.task('test-backend-full', shell.task([
    'cd /Users/louisbichard/Documents/sites/survivorsunited/backend',
    'jasmine-node . --color '
]));

gulp.task('test-backend-dev', shell.task([
    'cd /Users/louisbichard/Documents/sites/survivorsunited/backend',
    'cd backend',
    'jasmine-node . --color '
]));

gulp.task('database', shell.task([
    "mongod --dbpath '/backend/data'"
]));

gulp.task('test-http', shell.task([
	"node backend/tests/endpoint_tests/test.output.js",
    "vows backend/tests/endpoint_tests/*.test.js"
]));

gulp.task('test-backend', shell.task([
	"node backend/tests/unit_tests/test.output.js",
    "jasmine-node backend/tests/unit_tests  --color"
]));

