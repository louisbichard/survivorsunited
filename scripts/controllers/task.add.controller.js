// TYPE: CONTROLLER
// PARTIAL: add_task.html 

SU.controller('addTaskController', function($scope, apiService, utilityService, notifyService) {

    $scope.clearTask = function() {
        $scope.add_task = {};
        notifyService.success('Cleared form');
    };

    $scope.assignUsersToScope = function(users) {
        $scope.users = users;
    };

    $scope.bootstrap = function() {
        apiService.get('/users/listall')
            .then($scope.assignUsersToScope);
    };

    $scope.addTask = function() {
        // PAYLOAD
        var pl = $scope.add_task;
        console.log(pl);
        // TODO: REMOVE THIS AND REPLACE WITH FORM VALIDATION
        if (!pl || !pl.title || !pl.description || !pl.assignees || !pl.actions) {
            return notifyService.error('Required fields missing');
        }
        else {
            return apiService.post('/task/add', $scope.add_task);
        }
    };

    $scope.bootstrap();

});