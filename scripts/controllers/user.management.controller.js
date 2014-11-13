SU.controller('userManagementController', function($scope, apiService, chartService) {

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
    // ABSTRACT INTO SERVICE

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
        apiService.get('/users/listall').then(function(users) {

            $scope.$apply(function() {

                //SETUP USERS FOR LIST
                $scope.users = users;

                //SETUP USER RESULT COUNT
                $scope.user_count = users.length;
                
                // COUNT ALL ROLES
                $scope.roleCounts = {
                    admin: $scope.countRole('Admin', users),
                    mentor: $scope.countRole('Mentor', users),
                    basic: $scope.countRole('basic', users)
                };

                //SETUP USERS WITHOUT MENTORS
                usersWithoutMentors(users);

                //SETUP SEVERITY CHART
                $scope.severity_chart_data = {
                    data: chartService.userSeverityGrade(users),
                    series: chartService.blankSeries(users.length)
                };
            });


            //SETUP CREATION DATE CHART

            /*            $scope.signup_chart_data = {
                            data: chartService.userCreationDates(users),
                            series: chartService.blankSeries(users.length)
                        };*/





        });
    }();
});