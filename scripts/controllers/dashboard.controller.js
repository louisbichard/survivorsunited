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

    $scope.setupScope = function(tasks) {
        $scope.tasks = tasks;
        $scope.setupStatistics();
    };

    $scope.setupStatistics = function() {
        $scope.pending_tasks = $scope.countStatus($scope.tasks, 'open');
        $scope.complete_tasks = $scope.countStatus($scope.tasks, 'closed');
    };

    // TODO: ABSTRACT OUT IN TO SERVICE
    $scope.countStatus = function(tasks, status) {
        return _.filter(tasks, function(task) {
                return task.status === status;
            })
            .length;
    };

    $scope.bootstrap = function() {
        apiService.get('/tasks/assigned', null, {
                preventNotifications: true
            })
            .then($scope.setupScope);
    };

    $scope.updateScope = function(task_id, status) {
        var index = _.findIndex($scope.tasks, {
            _id: task_id
        });
        if (index < 0) {
            throw new Error('Task ID passed was incorrect in updateScope');
        }
        $scope.tasks[index].status = status;
        $scope.setupStatistics();
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
            .then(_.partial($scope.updateScope, task_id, status))
            .then(_.partial(notifyService.success, 'Updated task'));
    };

    $scope.bootstrap();

});