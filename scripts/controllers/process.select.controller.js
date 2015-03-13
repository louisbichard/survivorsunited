SU.controller('selectProcessController', function($scope, apiService, $location) {

    $scope.actions = {
        redirectToProcess: function() {
            $location.path('/process_manager/' + $scope.selected_process);
        }
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