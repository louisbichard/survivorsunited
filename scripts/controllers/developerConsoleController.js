// TYPE: CONTROLLER
// PARTIAL: DEVELOPER_CONSOLE

SU.controller('developerConsoleController', function($scope, apiService, chartService) {
    $scope.results = {
        backend: {},
        frontend: {}
    };
    $scope.loading = {
        frontend: false,
        backend: false
    };
    $scope.frontend_tests = {};
    $scope.errors_by = {};

    // CHART CONFIGURATIONS
    $scope.chart_config = {
        "labels": false,
        "legend": {
            "display": false,
            "position": "right"
        },
        "lineLegend": false
    };

    $scope.runTest = function(type) {
        $scope.loading[type] = true;
        apiService.get('/test' + type, null, {
                preventNotifications: true
            })
            .then(_.partialRight($scope.addResponseToScope, 'type'));
    };

    $scope.addResponseToScope = function(result, type) {
        $scope.$apply(function() {
            $scope.results[type] = result;
            $scope.loading[type] = false;
        });
    };

    $scope.addErrorsToScope = function(result) {
        $scope.errors_by = {
            'anonymous': chartService.formatErrors(_.countBy(result, 'anonymous')),
            'err': chartService.formatErrors(_.countBy(result, 'err')),
            'location': chartService.formatErrors(_.countBy(result, 'location'))
        };
        $scope.error_list = result;
    };

    $scope.getErrors = function() {
        apiService.get('/backenderrors', null, {
                preventNotifications: true
            })
            .then($scope.addErrorsToScope);
    };

    $scope.error_data = $scope.getErrors();

    /*apiService.get('/codecomplexity')
        .then(function(result) {
            $scope.complexity = result;
        });*/

});