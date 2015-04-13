SU.controller('processManagerController', function($scope, apiService, utilityService, notifyService, $route, uuid, dateService, $location) {

    var process_manager = {
        init: function() {
            this.setupNewAssignee();
            this.getAllUsers();
            this.refreshProcess();
        },
        users: [], // TO BE POPULATED WHEN THE DB CALL IS MADE
        setupNewAssignee: function() {
            $scope.new_assignee = undefined;
        },
        getAllUsers: function() {
            return apiService.get('/users/listall').then(function(results) {
                process_manager.users = _.map(results, function(curr) {
                    return _.pick(curr, ['_id', 'first_name', 'last_name']);
                });
                process_manager.removeAlreadyAllocatedUsers();
            });
        },
        removeAlreadyAllocatedUsers: function() {
            if ($scope.process && $scope.process.assignees) {
                $scope.users = _.filter(process_manager.users, function(val) {
                    return $scope.process.assignees.indexOf(val._id) == -1;
                });
            }
        },
        refreshProcess: function() {
            return apiService.get('/process/read/get_by_id', {
                "id": $route.current.params.process_id
            }).then(function(result) {
                $scope.process = result[0];
            });
        },
        syncroniseDatabaseTasks: function() {
            return apiService.post('/process/update/updatealltasks', {
                id: $scope.process._id,
                tasks: $scope.process.tasks
            }).then(function() {}).caught(function() {});
        },
        syncroniseDatabaseAsignees: function() {
            apiService.post('/process/update/assignees', {
                id: $scope.process._id,
                assignees: $scope.process.assignees
            }).then(function() {
                console.log('assignees have changed so update them');
            }).caught(function() {
                console.log('caught error');
            });

        }
    };

    $scope.lookUpNameFromID = function(id) {
        var user = _.findWhere(process_manager.users, {
            _id: id
        });
        return user && (user.first_name || user.last_name) ? user.first_name + " " + user.last_name : "Anonymous user";
    };

    $scope.updateNameAndDescription = function() {
        return apiService.post('/process/update/name_and_description', {
            id: $scope.process._id,
            name: $scope.process.name,
            description: $scope.process.description
        }).then(function() {
            console.log("name or description updated");
        });
    };

    $scope.assigneeActions = {
        addNewAssignee: function(assignee) {
            var assignees = $scope.process.assignees;
            assignees.push(assignee);
            assignees = _.uniq(assignees);
            $scope.process.assignees = assignees;
            this.syncModel();
        },
        removeAssignee: function(assignee) {
            var assignees = $scope.process.assignees;
            var assignee_index = assignees.indexOf(assignee);
            assignees.splice(assignee_index, 1);
            $scope.process.assignees = assignees;
            console.log('remove assignee');
            this.syncModel();
        },
        syncModel: function() {
            process_manager.syncroniseDatabaseAsignees();
            process_manager.removeAlreadyAllocatedUsers();
        }
    };

    $scope.processActions = {
        publish: function() {
            apiService.post("/process/update/publish", {
                published: Number(!$scope.process.published),
                id: $scope.process._id
            }).then(function() {
                var action = $scope.process.published ? 'Published' : 'Unpublished';
                notifyService.success(action + ' process');
                process_manager.refreshProcess();
            }).caught(function() {
                // TODO: COME UP WIHT SOME BETTER ERROR MESSAGE
            });
        }
    };

    $scope.taskActions = {
        editContent: function(task_id) {
            $scope.$apply(function() {
                console.log('edit content');
                $location.path('/task_editor/' + $scope.process._id + '/' + task_id);
            });
        },
        removeDependency: function(origin, dependency) {
            var task_index = _.findIndex($scope.process.tasks, {
                id: origin
            });
            var dependencies = $scope.process.tasks[task_index].dependencies || [];
            var dependency_index = dependencies.indexOf(dependency);
            $scope.process.tasks[task_index].dependencies.splice(dependency_index, 1);
            notifyService.success('Removed dependency successfully');
            process_manager.syncroniseDatabaseTasks();
        },
        deleteTask: function(id) {
            console.log('remove task');
            var idx = _.findIndex($scope.process.tasks, {
                id: id
            });
            $scope.process.tasks.splice(idx, 1);
            $scope.process.tasks = _.map($scope.process.tasks, function(task) {
                // REMOVE REFERENCES TO DEPENDENCY
                if (task.dependencies) {
                    var dependency_idx = task.dependencies.indexOf(id);
                    if (dependency_idx !== -1) task.dependencies.splice(dependency_idx, 1);
                }
                return task;
            });
            notifyService.success('Removed task successfully');
            process_manager.syncroniseDatabaseTasks();
        },
        addDependency: function(start_id, end_id) {
            var origin_idx = _.findIndex($scope.process.tasks, {
                id: start_id
            });
            var dependency_idx = _.findIndex($scope.process.tasks, {
                id: end_id
            });

            var already_in_dependency = $scope.process.tasks[origin_idx].dependencies.indexOf(end_id) > -1;
            var is_cyclical = $scope.process.tasks[dependency_idx].dependencies.indexOf(start_id) > -1;

            if (already_in_dependency) {
                notifyService.warning('Task already a dependency');
            } else if (is_cyclical) {
                notifyService.warning('Cannot define cyclical dependencies');
            } else if (!already_in_dependency) {
                $scope.process.tasks[origin_idx].dependencies.push(end_id);
                notifyService.success('Added task dependency');
            }

            process_manager.syncroniseDatabaseTasks();
        }
    };

    $scope.taskActionsTemp = {
        addToProcess: function() {
            $scope.process.tasks.push({
                id: uuid.v4(),
                name: 'A new task',
                description: 'No description yet given',
                dependencies: [] // SET UP DEFAULT INCASE THE PROCESS HAS NONE
            });

            notifyService.success('Added task to process');
            process_manager.syncroniseDatabaseTasks();
        }
    };

    process_manager.init();

});