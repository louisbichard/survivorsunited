// Karma configuration
// Generated on Thu Oct 30 2014 10:27:41 GMT+0000 (GMT)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [

            // UTILITIES 
            './tests/utilities/jasmineCustomMatchers.js',
            './tests/utilities/unitTestUtilities.js',
            './node_modules/karma-jasmine-async/src/jasmine.async.js',

            './scripts/bundle.js',

            // BOWER
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/bootstrap/dist/js/bootstrap.min.js',
            './bower_components/toastr/toastr.min.js',
            './bower_components/angular-route/angular-route.js',
            './bower_components/d3/d3.min.js',
            './bower_components/angular-charts/dist/angular-charts.min.js',
            './bower_components/angular-ui-calendar/src/calendar.js',
            './bower_components/fullcalendar/fullcalendar.js',
            './bower_components/angular-loading-bar/src/loading-bar.js',
            './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            './bower_components/angular-cookies/angular-cookies.min.js',
            './bower_components/angular-intro.js/src/angular-intro.js',
            './bower_components/intro.js/minified/intro.min.js',

            // ANGULAR INITIALISE
            './scripts/app.js',

            // CONTROLLERS
            './scripts/controllers/dashboard.controller.js',
            './scripts/controllers/task.add.controller.js',
            './scripts/controllers/main.controller.js',
            './scripts/controllers/user.management.controller.js',
            './scripts/controllers/user.statistics.controller.js',
            './scripts/controllers/user.account.controller.js',
            './scripts/controllers/user.add.controller.js',
            './scripts/controllers/mentor.controller.js',
            './scripts/controllers/mentees.controller.js',
            './scripts/controllers/events.upcoming.watched.subscribed.controller.js',
            './scripts/controllers/event.add.controller.js',
            './scripts/controllers/events.usersWatchingOrAttending.js',
            './scripts/controllers/events.calendar.controller.js',

            // ROUTES
            './scripts/angular.routes.js',

            // DIRECTIVES
            './scripts/directives/keypress.enter.directive.js',

            // SERVICES
            './scripts/services/user.data.service.js',
            './scripts/services/date.service.js',
            './scripts/services/chart.service.js',
            './scripts/services/api.service.js',
            './scripts/services/notify.service.js',
            './scripts/services/utilities.service.js',

            // FILTERS
            './scripts/filters/internal.filter.js',
            './scripts/filters/assignedMentor.filter.js',
            './scripts/filters/severity.filter.js',

            //MOCKING FOR ANGULAR
            './bower_components/angular-mocks/angular-mocks.js',

            //INCLUDE ALL SPEC TEST FILES
            'tests/frontend/*spec.js'
        ],

        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'scripts/*[!bundle.js, !main.js]*/*.js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'tests/coverage/'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};