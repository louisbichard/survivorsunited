SU.controller('createProcessController', function($scope, apiService, utilityService, notifyService) {

    $scope.test = "test_test process create controller";
    $scope.process = {
        "_id": "123 b2323b3b3b3b3332",
        "name": "some process name",
        "published": 0,
        "description": "some description",
        "date_created": 1425826243690,
        "date_updated": 1425826243690,
        "tasks": [{
            "id": "some_id",
            "name": "Some task name",
            "description": "test",
            "content": "<p> Some html </p>",
            "dependencies": [
                "task_id",
                "task_id"
            ],
            "completed_by": [
                "user_id",
                "user_id"
            ]
        }],
        "assignees": ["b1233b2k2kj2j2"]
    };
});