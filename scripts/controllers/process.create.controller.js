SU.controller('createProcessController', function($scope, apiService, utilityService, notifyService, $modal) {

    $scope.test = "test_test process create controller";

    $scope.new_task = {};

    var updateDatabase = function(){
        console.log('update database of process change');
    };

    $scope.taskActions = {
        addToProcess: function() {
            $scope.new_task.dependencies = JSON.parse($scope.new_task.dependencies);
            $scope.process.tasks.push($scope.new_task);
            $scope.new_task = {};
            notifyService.success('Added task to process');
            updateDatabase();
        },
        editContent: function(index) {
            console.log($scope.process.tasks[index].content, 'edit this');
            updateDatabase();
        },
        deleteTask: function(idx){
            $scope.process.tasks.splice(idx, 1);
            updateDatabase();
            notifyService.success('Removed task successfully');
        }
    };

    $scope.process = {
        "_id": "123 b2323b3b3b3b3332",
        "name": "some process name",
        "published": 0,
        "description": "some description",
        "date_created": 1425826243690,
        "date_updated": 1425826243690,
        "tasks": [{
            "id": "some_id1",
            "name": "Some task name",
            "description": "test",
            "content": "<p> Some html </p>",
            "dependencies": [
                "some_id2"
            ],
            "completed_by": [
                "user_id",
                "user_id"
            ]
        }, {
            "id": "some_id2",
            "name": "Some task name",
            "description": "test",
            "content": "<p> Some html </p>",
            "dependencies": [
                "some_id2"
            ],
            "completed_by": [
                "user_id",
                "user_id"
            ]
        }, {
            "id": "some_id3",
            "name": "Some task name",
            "description": "test",
            "content": "<p> Some html </p>",
            "dependencies": [
                "some_id1"
            ],
            "completed_by": [
                "user_id",
                "user_id"
            ]
        }],
        "assignees": ["b1233b2k2kj2j2"]
    };

});