SU.controller('userAddController', function($scope, $http, allUsersFactory, apiService, chartService) {

    $scope.add_user = function() {
        return apiService
            .post('/user/add', $scope.new_user)
            .then(function(data) {
                //TODO: REFRESH USERS ON PAGE
            })
            .caught(function() {
                // TODO: HANDLE WHEN THE API ERRORS
            });
    };

    $scope.submitForm = function() {
        $scope.add_user();
    };

});