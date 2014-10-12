SU.controller('accountController', function($scope, isAuthenticatedFactory) {
    $scope.test = "account page";
    isAuthenticatedFactory.then(function(users) {
            $scope.user = users.data;
        });
});