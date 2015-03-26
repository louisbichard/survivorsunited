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
                    console.log(task);
                    $scope.task_details = task;
                })
                .caught(function() {
                    // TODO: MAKE THIS BETTER
                    console.log('Couldnt fetch tasks');
                });
        }
    };

    $scope.updateNameAndDescription = function() {
        console.log('save name and description here', $scope.task_details);




        var payload = {
            task_id: $scope.config.task_id,
            process_id: $scope.config.process_id,
            name: $scope.task_details.name,
            description: $scope.task_details.description
        };

        apiService.post('/process/task/update/name_and_description', payload)
            .then(function() {
                notifyService.success('Updated name and description');
            })
            .caught(function() {
                console.log('save contnet updates');
            });


    };

    $scope.saveContent = function() {
        console.log('save content');

        var payload = {
            task_id: $scope.config.task_id,
            process_id: $scope.config.process_id,
            content: $scope.task_details.content
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