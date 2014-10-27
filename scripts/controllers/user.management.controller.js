SU.controller('userManagementController', function($scope, $http, allUsersFactory, registerUserFactory) {

    var currentValues = function(output) {
        return _.reduce(output, function(prev, curr) {
            prev.push(curr.x);
            return prev;
        }, []);
    };

    var userCreationDates = function(users) {


        //TODO: UNIT TEST THIS FUNCTION!!!
        var chart_data = _.reduce(users, function(prev, curr) {
            var index = $.inArray(curr.date_created, currentValues(prev));
            if (index > -1) {
                prev[index].y[0] ++;
            } else {
                prev.push({
                    x: curr.date_created,
                    y: [1]
                });
            }
            return prev;
        }, []);

        // CREATE SERIES (JUST AN ARRAY OF EMPTY STRINGS)
        var n = chart_data.length;
        var series = Array(n).join(".").split(".");

        $scope.chart_data.data = chart_data;
        $scope.chart_data.series = series;
    };

    $scope.chart_config = {
    };

    $scope.chart_data = {

    };

    $scope.add_user = function() {
        return $http
            .post('http://localhost:3000/user/add', $scope.new_user)
            .success(function(data, status, headers, config) {
                if (data.success) {
                    notification('Success!', 'user: ' + $scope.new_user.username + ' added!');
                    $scope.users = [];
                    //$scope.refreshUsers();
                } else {
                    notification('Oh no!', data.error, 'error');
                }
            })
            .error(function(data, status, headers, config) {
                notification('Oh no!', 'Something went wrong when trying to add a user!', 'error');
                return false;
            });
    };

    $scope.removeUser = function(user) {
        return $http
            .post('http://localhost:3000/user/delete', {
                id: user._id
            })
            .success(function(data, status, headers, config) {
                if (data.success) {
                    notification('Success!', 'user: ' + user.username + "(" + user.id + ") removed!");
                    $scope.users = [];
                    refreshUsers();
                } else {
                    console.log('something went wrong');
                    notification('Oh no!', data.error_message, 'error');
                }
            })
            .error(function(data, status, headers, config) {
                notification('Oh no!', 'Something went wrong when trying to remove a user!', 'error');
                return false;
            });
    };


    // AUTOMATICALLY INVOKED
    var refreshUsers = function() {
        $scope.users = [];
        allUsersFactory.then(function(users) {
            var user_data = users.data.result.users;
            $scope.users = user_data;
            $scope.user_count = users.data.result.count;
            $scope.user_creation_dates = userCreationDates(user_data);
        });
    }();


});