SU.controller('taskManagementController', function($scope, apiService, chartService, dateService) {

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

    // ABSTRACT OUT INTO A SERVICE
    $scope.average = function(arr) {
        return {
            val: _.reduce(arr, function(memo, num) {
                return memo + num;
            }, 0) / (arr.length === 0 ? 1 : arr.length),
            num: arr.length
        };
    };

    $scope.formulateStats = function(tasks) {
        return _.map(tasks, function(task) {
            task.stats = {
                status: _.countBy(task.assignees, 'status'),
                // MAKE ARRAY OF COMMENTS
                rating_comments: _.reduce(task.assignees, function(prev, item) {
                    if (item.rating && item.rating.comment) prev.push(item.rating.comment);
                    return prev;
                }, []),
                // NUMBER OF ASSIGNEES
                number_of_assignees: Object.keys(task.assignees)
                    .length,
                // GET ARRAY OF SCORES
                average_rating: $scope.average(_.reduce(task.assignees, function(prev, item) {
                    if (item.rating && item.rating.score) prev.push(item.rating.score);
                    return prev;
                }, []))
            };
            return task;
        });
    };

    $scope.bootstrap();
});