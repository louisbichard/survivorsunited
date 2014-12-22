SU.controller('dashboardController', function($scope, apiService, notifyService, userDataService) {

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

    $scope.countStatus = function(tasks, status) {
        return userDataService.countStatus(tasks, status, $scope.user);
    };

    $scope.passScopeToSetup = function(results) {
        $scope.setupScopeForTasks('user', results.user);
        $scope.setupScopeForTasks('tasks', results.tasks);
        $scope.setupStatistics();
    };

    $scope.bootstrap = function() {
        return Promise.props({
                tasks: apiService.get('/tasks/listall', {
                    user: 'current'
                }, {
                    preventNotifications: true
                }),
                user: apiService.get('/user/current', null, {
                    preventNotifications: true
                })
            })
            .then($scope.passScopeToSetup);
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
