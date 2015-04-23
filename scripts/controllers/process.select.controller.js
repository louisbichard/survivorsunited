SU.controller('selectProcessController', function($scope, apiService, $location, notifyService) {

    $scope.actions = {
        redirectToProcess: function() {
            $location.path('/process_manager/' + $scope.selected_process);
        }
    };

    $scope.createProcess = function() {
        console.log('Create process');

        var new_process = _.extend($scope.new_process, {
            assignees: [],
            tasks: [],
            published: 0
        });

        apiService.post('/process/create', new_process)
            .then(function() {
                notifyService.success('Process created');
            }).caught(function() {
                console.log('Process create failed');
            });

    };

    var select_module = {
        init: function() {
            this.getProcessDetails();
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
        }
    };

    select_module.init();
});