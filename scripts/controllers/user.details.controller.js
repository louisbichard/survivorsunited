SU.controller('userDetailsController', function($scope, $http, allUsersFactory, apiService, chartService) {

    $scope.removeUser = function(user) {

        return apiService
            .post('http://localhost:3000/user/delete', {
                id: user._id
            })
            .then(function(data) {
                //TODO: REFRESH USERS ON PAGE
            })
            .caught(function() {
                // TODO: HANDLE WHEN THE API ERRORS
            });
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
        });
    }();
});