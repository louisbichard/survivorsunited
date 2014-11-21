// TYPE: CONTROLLER
// PARTIAL: DEVELOPER_CONSOLE

SU.controller('developerConsoleController', function($scope, apiService) {
    $scope.controller = "remove this";
    $scope.backend_tests = {
        "successful_tests": 11,
        "total_endpoints": 12,
        "success": false
    };
    $scope.loading = true;

    apiService.get('/testresults', null, {
        preventNotifications: true
    })
        .then(function(result) {
            $scope.$apply(function() {
                $scope.backend_tests = result;
                $scope.loading = false;
            });
        });
});