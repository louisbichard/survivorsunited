SU.controller('completeTaskController', function($scope, apiService, utilityService, notifyService, $route) {
    $scope.config = $route.current.params;

    var task_complete = {
        init: function() {
            this.getTasksForGivenProcess();
        },
        findTaskInArray: function(result) {
            return _.findWhere(result[0].tasks, {
                id: $scope.config.task_id
            });
        },
        getTasksForGivenProcess: function() {
            return apiService.get("/process/read/getalltasks", {
                    id: $scope.config.process_id
                })
                .then(this.findTaskInArray)
                .then(function(task) {
                    $scope.content = task.content;
                })
                .caught(function() {
                    // TODO: MAKE THIS BETTER
                    console.log('Couldnt fetch tasks');
                });
        }
    };

    
    task_complete.init();

});