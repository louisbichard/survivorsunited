// TYPE: CONTROLLER
// PARTIAL: add_task.html 

SU.controller('addTaskController', function($scope, apiService, utilityService, notifyService) {

    $scope.clearTask = function() {
        console.log('clear tasks');
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
        console.log('adding task');
        //TODO: VALIDATE THAT ALL DATA HAS BEEN ENTERED 
        return apiService.post('/task/add', $scope.add_task);
    };

    $scope.bootstrap();

});