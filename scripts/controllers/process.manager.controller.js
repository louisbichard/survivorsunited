SU.controller('processManagerController', function($scope, apiService, utilityService, notifyService, $route) {

    var process_manager = {
        init: function() {
            this.setupScopeVariables();
            this.getProcessDetails();
            this.watchForSelectedProcess();
            this.checkUrlForPassedConfig();
        },
        checkUrlForPassedConfig: function(){
            $scope.selected_process = $route.current.params.process_id;
        },
        setupScopeVariables: function() {
            $scope.process = {};
            $scope.test = "test_test process create controller";
            $scope.new_task = {};
        },
        getProcessDetails: function() {
            return apiService
                .get('/process/read/getallids')
                .then(function(result) {
                    $scope.all_process_details = result;
                })
                .caught(function() {
                    // TODO: HANDLE ERROR
                });
        },
        refreshProcess: function() {
            apiService.get('/process/read/get_by_id', {
                "id": $scope.selected_process
            }).then(function(result) {
                $scope.process = result[0];
            });
        },
        watchForSelectedProcess: function() {
            $scope.$watch('selected_process', function() {
                if ($scope.selected_process) process_manager.refreshProcess();
            });
        }

    };

    var updateDatabase = function() {
        console.log('update database of process change');
    };

    $scope.processActions = {
        publish: function() {
            apiService.post("/process/update/publish", {
                published: Number(!$scope.process.published),
                id: $scope.process._id
            }).then(function() {
                notifyService.success('Published process');
                process_manager.refreshProcess();
            }).caught(function() {
                // TODO: COME UP WIHT SOME BETTER ERROR MESSAGE
                console.log('Process could not be published');
            });
        }
    };

    $scope.taskActions = {
        addToProcess: function() {
            $scope.new_task.dependencies = JSON.parse($scope.new_task.dependencies);
            $scope.process.tasks.push($scope.new_task);
            $scope.new_task = {};
            notifyService.success('Added task to process');
            updateDatabase();
        },
        editContent: function(index) {
            console.log($scope.process.tasks[index].content, 'edit this');
            updateDatabase();
        },
        deleteTask: function(idx) {
            $scope.process.tasks.splice(idx, 1);
            updateDatabase();
            notifyService.success('Removed task successfully');
        }
    };

    process_manager.init();

});