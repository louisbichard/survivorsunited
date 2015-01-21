SU.controller('statisticsController', function($scope, apiService, chartService, dateService, userDataService) {

    $scope.signup_chart_config = {};
    $scope.signup_chart_data = {};
    $scope.severity_chart_config = {
        "labels": true,
        "legend": {
            "display": true,
            "position": "right"
        },
        colors: ['#0bff14', '#fffb10', '#ff2b1d']
    };
    $scope.severity_chart_data = {};

    $scope.setupUsers = function(users) {
        $scope.users = dateService.formatDatesArray(users, ['date_created']);
    };

    $scope.setupUserCount = function() {
        $scope.user_count = $scope.users.length;
    };

    $scope.setupRoleCount = function() {
        $scope.roleCounts = {
            admin: userDataService.countRole('Admin', $scope.users),
            mentor: userDataService.countRole('Mentor', $scope.users),
            basic: userDataService.countRole('Basic', $scope.users)
        };
    };


    // TODO: REMVOE AND SORT THESE OUT
    $scope.labels = ['Nov 2014', 'December 2014', 'January 2015', 'February 2015', 'March 2015'];
    $scope.series = ['Series A'];

    $scope.data = [
        [65, 59, 12, 100, 4]
    ];

    $scope.labels1 = ["High", "Medium", "Low"];
    $scope.data1 = [30, 20, 10];


    $scope.setupUsersWithoutMentors = function() {
        $scope.without_mentors = userDataService.countMissingMentors($scope.users);
    };

    $scope.setupSeverityChart = function() {
        $scope.severity_chart_data = {
            data: chartService.userSeverityGrade($scope.users),
            series: chartService.blankSeries($scope.users.length)
        };
    };

    $scope.setupSignupChart = function() {
        $scope.signup_chart_data = {
            data: chartService.userCreationDates($scope.users),
            series: chartService.blankSeries($scope.users.length)
        };

    };

    // AUTOMATICALLY INVOKED
    $scope.refreshUsers = function() {
        $scope.users = [];
        apiService.get('/users/listall', null, {
                preventNotifications: true
            })
            .then($scope.setupUsers)
            .then($scope.setupUserCount)
            .then($scope.setupRoleCount)
            .then($scope.setupUsersWithoutMentors)
            .then($scope.setupSeverityChart)
            .then($scope.setupSignupChart);
    };

    $scope.refreshUsers();
});