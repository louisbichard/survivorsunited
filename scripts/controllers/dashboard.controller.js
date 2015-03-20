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


    var dashboard_module = {

        init: function() {
            this.getProcesses();
        },
        taskActions: {
            update_status: function(process_id, task_id, is_complete) {
                apiService.post("/process/update/task/completed_status", {
                    process_id: process_id,
                    task_id: task_id,
                    is_complete: is_complete
                }).then(function() {
                    console.log('updated task');
                }).caught(function() {
                    console.log('could not update task');
                    // TODO: MAKE A BETTER ERROR HANDLE HERE
                });
            }
        },
        getProcesses: function() {
            return apiService.get('/process/assigned_to_me')
                .then(dashboard_module.modifyTasksWithIncompleteTasks)
                .then(function(result) {
                    $scope.$apply(function() {
                        $scope.processes = result;
                    });

                })
                .caught(function() {
                    console.log('could not get current assigned processes');
                    // TODO: DO SOMETHING HERE
                });
        },
        modifyTasksWithIncompleteTasks: function(processes) {
            return _.map(processes, function(process) {
                var modified_tasks = dashboard_module.mapTasks(process.tasks, process);
                process.tasks = _.sortBy(modified_tasks, function(task) {
                    return task.completed_by_current_user;
                });

                return process;
            });
        },
        completedByCurrentUser: function(task) {
            var user_id = $scope.user_details._id;
            var completed_by = task.completed_by || [];
            var is_complete = completed_by.indexOf(user_id) !== -1;
            return is_complete;
        },
        mapTasks: function(tasks, process) {
            return _.map(tasks, function(task, index) {
                task.completed_by_current_user = dashboard_module.completedByCurrentUser(task);
                task.incomplete_tasks = dashboard_module.incomplete_tasks(
                    $scope.user_details._id,
                    process,
                    index
                );
                return task;
            });
        },
        incomplete_tasks: function(user_id, process, task_index) {
            var current_task = process.tasks[task_index];
            var current_dependencies = current_task.dependencies || [];

            return _.chain(process.tasks)
                // FILTER OUT ONLY DEPENDENT TASKS 
                .filter(function(task, index) {
                    // CHECK THAT TASK IS DEPENDENT ON THE CURRENT TASK IN QUESTION
                    var is_dependency = current_dependencies.indexOf(task.id) !== -1;

                    var completed_by = task.completed_by || [];
                    // LOOK IN THE ARRAY FOR THE USERS ID, AND SEE ITS STATUS
                    var incomplete = completed_by.indexOf(user_id) === -1;

                    // IF TASK IS NOT COMPLETE OR IS DEPENDENT RETURN IT
                    return incomplete && is_dependency;
                })
                .map(function(curr) {
                    return _.pick(curr, ['name', 'id']);
                })
                .value();
        }
    };

    $scope.processActions = {
        markAsComplete: function(process_id, task_id, is_complete) {
            if (process_id && task_id && is_complete !== undefined) {
                is_complete = Number(!is_complete);
                dashboard_module.taskActions.update_status(process_id, task_id, is_complete);
                dashboard_module.init();
            }
        }
    };

    dashboard_module.init();

});