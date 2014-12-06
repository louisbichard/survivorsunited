SU.controller('notificationController', function($scope, apiService, notifyService) {
    $scope.ratings_to_update = {};
    $scope.bootstrap = function() {
        // CACHE CURRECT USER
        return Promise.props({
                tasks: apiService.get('/tasks/listall', {
                    user: 'current',
                    status: 'closed'
                }, {
                    preventNotifications: true
                }),
                user: apiService.get('/user/current', null, {
                    preventNotifications: true
                })
            })
            .then($scope.assignReultsToScope);
    };

    $scope.assignReultsToScope = function(result) {
        $scope.tasks = result.tasks;
        $scope.user = result.user;
    };

    $scope.getIndexOf = function(task_id) {
        return _.findIndex($scope.tasks, {
            _id: task_id
        });
    };

    $scope.ammendUpdateObject = function(task_id, prop, value) {
        // IF NOT IN THE UPDATE OBJECT ADD IT (TO PREVENT ERRORS)
        if (!$scope.ratings_to_update[task_id]) {
            $scope.ratings_to_update[task_id] = {};
            $scope.ratings_to_update[task_id].rating = {};
        }

        // UPDATE RATINGS UPDATE OBJECT
        $scope.ratings_to_update[task_id].rating[prop] = value;
    };

    $scope.updateTasksObject = function(task_id, prop, value) {
        // UPDATE ORIGINAL SCOPE VALUE
        var idx = $scope.getIndexOf(task_id);
        $scope.tasks[idx].assignees[$scope.user._id].rating[prop] = value;
    };

    $scope.updateRating = function(task_id, prop, value) {
        $scope.ammendUpdateObject(task_id, prop, value);
        $scope.updateTasksObject(task_id, prop, value);
    };

    $scope.setRating = function(rating, task_id) {
        if (!rating || !task_id) {
            notifyService.error('Cannot rate task with insufficient details');
        } else {
            apiService.post('/task/update', {
                    task_id: task_id,
                    rating: rating
                }, {
                    preventNotifications: true
                })
                .then(_.partial(notifyService.success, 'Rating updated'));
        }
    };

    $scope.bootstrap();

});