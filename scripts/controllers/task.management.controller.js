SU.controller('taskManagementController', function($scope, apiService, chartService, dateService, taskDataService, utilityService) {

    $scope.bootstrap = function() {
        apiService.get('/tasks/listall', null, {
                preventNotifications: true
            })
            .then(_.partialRight(dateService.formatDatesArray, ['date_created']))
            .then($scope.formulateStats)
            .then(function(result) {
                $scope.tasks = result;
            });
    };


    $scope.formulateStats = function(tasks) {
        return _.map(tasks, function(task) {
            task.stats = {
                // COUNT THE UNIQUE STATUS'
                status: _.countBy(task.assignees, 'status'),
                // MAKE ARRAY OF COMMENTS
                rating_comments: taskDataService.getComments(task),
                // NUMBER OF ASSIGNEES
                number_of_assignees: Object.keys(task.assignees).length,
                // GET ARRAY OF SCORES
                average_rating: utilityService.average(taskDataService.getRatings(task))
            };
            return task;
        });
    };

    $scope.bootstrap();
});