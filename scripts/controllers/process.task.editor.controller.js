SU.controller('taskEditorController', function($scope, apiService, utilityService, notifyService, $route) {
    $scope.config = $route.current.params;

    var task_editor = {
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

    $scope.saveContent = function() {
        console.log('save content');

        var payload = {
            task_id: $scope.config.task_id,
            process_id: $scope.config.process_id,
            content: $scope.content
        };

        apiService.post('/process/task/update/content', payload)
            .then(function() {
                notifyService.success('Updated task content');
            })
            .caught(function() {
                console.log('save contnet updates');
            });
    };

    console.log('in file');
    task_editor.init();

});