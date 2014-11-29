SU.controller('taskManagementController', function($scope, apiService, chartService, dateService) {
    $scope.test = "Louis was here 2k10";
    $scope.filters = [{
        name: 'openTask',
        value: 'none'
    }];

    $scope.bootstrap = function() {
        apiService.get('/tasks/listall', null, {
                preventNotifications: true
            })
            .then(_.partialRight(dateService.formatDatesArray, ['date_created']))
            .then(function(result) {
                $scope.tasks = result;
            });
    };

    $scope.setFilter = function(filter, val) {
        var id = _.findIndex($scope.filters, {
            name: filter
        });

        if (id === -1) {
            throw new Error('Could not find filter name');
        }
        console.log('setting', filter, val, id);

        $scope.filters[id] = {
            name: filter,
            value: val
        };
    };

    $scope.setupDefaultFilters = function() {
        $scope.filters = [{
            name: 'openTask',
            value: 'none'
        }];
    };

    $scope.setupDefaultFilters();
    $scope.bootstrap();
});