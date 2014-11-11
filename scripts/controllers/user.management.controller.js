SU.controller('userManagementController', function($scope, $http, allUsersFactory, apiService, chartService) {

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


    // USERS WITHOUT MENTORS
    // =====================

    var usersWithoutMentors = function(users) {
        $scope.without_mentors = _.reduce(users, function(prev, user) {
            if (!user.mentor) {
                prev++;
            }
            return prev;
        }, 0);
    };

    // ABSTRACT OUT INTO SERVICE
    $scope.countRole = function(role, users) {
        if (!role || !users) {
            throw new Error('No role or users passed to countrole function');
        }
        return _.filter(users, function(user) {
            return user.role === role;
        }).length;
    };

    // AUTOMATICALLY INVOKED
    var refreshUsers = function() {
        $scope.users = [];
        allUsersFactory.then(function(users) {
            var user_data = users.data.result.users;

            //SETUP USERS FOR LIST
            $scope.users = user_data;

            //SETUP USER RESULT COUNT
            $scope.user_count = users.data.result.count;

            //SETUP CREATION DATE CHART
            $scope.signup_chart_data = {
                data: chartService.userCreationDates(user_data),
                series: chartService.blankSeries(user_data.length)
            };

            //SETUP SEVERITY CHART
            $scope.severity_chart_data = {
                data: chartService.userSeverityGrade(user_data),
                series: chartService.blankSeries(user_data.length)
            };

            // COUNT ALL ROLES
            $scope.roleCounts = {
                admin: $scope.countRole('Admin', user_data),
                mentor: $scope.countRole('Mentor', user_data),
                basic: $scope.countRole('basic', user_data)
            };

            //SETUP USERS WITHOUT MENTORS
            usersWithoutMentors(user_data);
        });
    }();
});