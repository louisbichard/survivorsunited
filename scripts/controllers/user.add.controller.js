SU.controller('userAddController', function($scope, apiService, notifyService) {

    $scope.add_user = function() {
        if (!$scope.new_user) {
            throw new Error('no user details specified');
        }

        return apiService
            .post('/user/add', $scope.new_user)
            .then(function(data) {
                //TODO: REFRESH USERS ON PAGE
                // BROADCAST UPDATE OF USER
            });
    };

});