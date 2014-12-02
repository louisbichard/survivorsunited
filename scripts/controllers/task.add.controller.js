// TYPE: CONTROLLER
// PARTIAL: add_task.html 

SU.controller('addTaskController', function($scope, apiService, utilityService, notifyService) {

    $scope.clearTask = function() {
        $scope.add_task = {};
        notifyService.success('Cleared form');
    };

    $scope.assignToScope = function(users) {
        $scope.users = users;
    };

    $scope.bootstrap = function() {
        apiService.get('/users/listall')
            .then($scope.assignToScope);
    };

    $scope.addTask = function() {
        // PAYLOAD
        var pl = $scope.add_task;
        if (!pl || !pl.title || !pl.description || !pl.assignees) {
            return notifyService.error('Required fields missing');
        }
        else {
            return apiService.post('/task/add', $scope.add_task);
        }
    };

    $scope.bootstrap();

});