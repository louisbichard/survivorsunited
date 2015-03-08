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
        return apiService.post('/task/add', $scope.add_task);
    };

    $scope.bootstrap();

});