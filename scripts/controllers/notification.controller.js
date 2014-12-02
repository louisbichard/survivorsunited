SU.controller('notificationController', function($scope, apiService, notifyService) {
    $scope.ratings = {};
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
            .then(function(result) {
                $scope.tasks = result.tasks;
                $scope.user = result.user;
            });
    };

    $scope.updateRating = function(task_id, prop, value) {
        if (!$scope.ratings[task_id]) {
            $scope.ratings[task_id] = {};
            $scope.ratings[task_id].rating = {};
        }
        $scope.ratings[task_id].rating[prop] = value;
        var idx = _.findIndex($scope.tasks, {
            _id: task_id
        });
        $scope.tasks[idx].assignees[$scope.user._id].rating[prop] = value;

    };

    $scope.setRating = function(rating, task_id) {
        console.log('setting rating to', rating);
        if (!rating || !task_id) {
            notifyService.error('Cannot rate task with insufficient details');
        }

        else {
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