// TYPE:    controller
// PARTIAL: mentor.html

SU.controller('mentorController', function($scope, apiService, notifyService) {

    $scope.getMentorData = function() {
        return apiService
            .get('/user/assigned_mentor', null, {
                preventNotifications: true
            })
            .then(function(result) {
                if (_.isPlainObject(result)) {
                    $scope.$apply(function() {
                        $scope.mentor = result;
                    });
                }
            })
            // TODO: HANDLE ERRORING API
            .caught(function(err) {
                debugger;
                //notifyService.error
            });
    }();
});
