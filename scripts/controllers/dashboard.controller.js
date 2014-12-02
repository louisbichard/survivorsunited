SU.controller('dashboardController', function($scope, apiService, notifyService) {

    // INTRO JS 
    // ABSTRACT OUT INTO SERVICE
    $scope.IntroOptions = {
        steps: [{
            element: '#intro-dashboard',
            intro: "This is the dashboard, here you will find pending tasks that you need to comlete and review previously completed tasks.",
            position: 'right'
        }, {
            element: '#intro-mentor',
            intro: "On the mentor page you can find contact details for your mentor and send them instant messages",
            position: 'right'
        }, {
            element: '#intro-account',
            intro: "On the account page you can edit your personal details",
            position: 'right'
        }],
        showStepNumbers: false,
        showBullets: true,
        exitOnOverlayClick: true,
        exitOnEsc: true,
        doneLabel: 'Thanks'
    };

    $scope.setupScopeForTasks = function(prop, vals) {
        $scope[prop] = vals;
    };

    $scope.setupStatistics = function() {
        $scope.pending_tasks = $scope.countStatus($scope.tasks, 'open');
        $scope.complete_tasks = $scope.countStatus($scope.tasks, 'closed');
    };

    // TODO: ABSTRACT OUT IN TO SERVICE
    $scope.countStatus = function(tasks, status) {
        return _.filter(tasks, function(task) {
                console.log(task.assignees, $scope.user._id);
                return task.assignees[$scope.user._id].status === status;
            })
            .length;
    };

    $scope.bootstrap = function() {
        Promise.props({
                tasks: apiService.get('/tasks/listall', {
                    user: 'current'
                }, {
                    preventNotifications: true
                }),
                user: apiService.get('/user/current', null, {
                    preventNotifications: true
                })
            })
            .then(function(result) {
                $scope.setupScopeForTasks('tasks', result.tasks);
                $scope.setupScopeForTasks('user', result.user);
                $scope.setupStatistics();
            });
    };

    $scope.updateTask = function(task_id, status) {
        if (!task_id || !status) {
            throw new Error('No task ID or status found in update task function');
        }
        apiService.post('/task/update', {
                task_id: task_id,
                status: status
            }, {
                preventNotifications: true
            })
            .then($scope.bootstrap)
            .then(_.partial(notifyService.success, 'Updated task'));
    };

    $scope.bootstrap();

});