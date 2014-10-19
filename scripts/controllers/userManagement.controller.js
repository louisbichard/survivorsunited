SU.controller('userManagementController', function($scope, $http, allUsersFactory, registerUserFactory) {
    $scope.add_user = function() {
        return $http
            .post('http://localhost:3000/user/add', $scope.new_user)
            .success(function(data, status, headers, config) {
                if (data.success) {
                    notification('Success!', 'user: ' + $scope.new_user.username + ' added!');
                    $scope.users = [];
                    $scope.refreshUsers();
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
                    notification('Success!', 'user: ' + user.username + "(" (user.id) + ") removed!");
                    $scope.users = [];
                    $scope.refreshUsers();
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

    $scope.refreshUsers = function() {
        $scope.users = [];
        allUsersFactory.then(function(users) {
            $scope.users = users.data.result.users;
        });
    };

    $scope.refreshUsers();


});