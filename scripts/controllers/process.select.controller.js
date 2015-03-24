SU.controller('selectProcessController', function($scope, apiService, $location, notifyService) {

    $scope.actions = {
        redirectToProcess: function() {
            $location.path('/process_manager/' + $scope.selected_process);
        }
    };

    $scope.createProcess = function(){
        console.log('Create process');
        notifyService.success('todo make this work');
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