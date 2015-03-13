SU.controller('processManagerController', function($scope, apiService, utilityService, notifyService, $route, uuid, dateService) {

    var process_manager = {
        init: function() {
            this.setupNewTask();
            this.setupNewAssignee();
            this.getAllUsers();
            this.refreshProcess();
            this.watchAssigneesForChanges();
            this.watchTasksForChanges();
        },
        users: [], // TO BE POPULATED WHEN THE DB CALL IS MADE
        setupNewAssignee: function() {
            $scope.new_assignee = undefined;
        },
        setupNewTask: function() {
            $scope.new_task = {
                id: uuid.v4(),
                tasks: [] // SET UP DEFAULT INCASE THE PROCESS HAS NONE
            };
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

        },
        watchAssigneesForChanges: function() {
            $scope.$watch('process.assignees', function() {
                if ($scope.process !== undefined) {
                    process_manager.syncroniseDatabaseAsignees();
                    process_manager.removeAlreadyAllocatedUsers();
                }
            });
        },
        watchTasksForChanges: function() {
            $scope.$watch('process.tasks', function() {
                // PREVENT ANUGLAR FROM TRYING TO UPDATE THE DB ON LOAD
                if ($scope.process !== undefined) {
                    process_manager.syncroniseDatabaseTasks();
                }
            }, true);
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
        addToProcess: function() {
            $scope.process.tasks.push($scope.new_task);
            process_manager.setupNewTask();
            notifyService.success('Added task to process');
        },
        editContent: function(index) {
            updateDatabase();
        },
        deleteTask: function(idx, id) {
            $scope.process.tasks.splice(idx, 1);
            $scope.process.tasks = this.removeIDfromTaskDependencies(id);
            notifyService.success('Removed task successfully');
        },
        removeIDfromTaskDependencies: function(id) {
            return _.map($scope.process.tasks, function(task) {
                if (task.dependencies) {
                    var dependency_idx = task.dependencies.indexOf(id);
                    // REMOVE REFERENCES TO DEPENDENCY
                    if (dependency_idx !== -1) task.dependencies.splice(dependency_idx, 1);
                }
                return task;
            });
        }
    };

    process_manager.init();

});