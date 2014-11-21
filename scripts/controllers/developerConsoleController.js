// TYPE: CONTROLLER
// PARTIAL: DEVELOPER_CONSOLE

SU.controller('developerConsoleController', function($scope, apiService) {
    $scope.controller = "remove this";
    $scope.results = {
        backend: {},
        frontend: {}
    };
    $scope.loading = {
        frontend: false,
        backend: false
    };

    $scope.frontend_tests = {};

    $scope.runTest = function(type) {
        $scope.loading[type] = true;
        apiService.get('/test' + type, null, {
                preventNotifications: true
            })
            .then(function(result) {
                $scope.$apply(function() {
                    $scope.results[type] = result;
                    $scope.loading[type] = false;
                });
            });
    };

    $scope.getErrors = function() {
        apiService.get('/backenderrors', null, {
                preventNotifications: true
            })
            .then(function(result) {
                $scope.$apply(function() {
                    $scope.error_list = result;
                });
            });
    };

    $scope.getErrors();


});