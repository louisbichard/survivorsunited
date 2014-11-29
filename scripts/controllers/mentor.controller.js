// TYPE:    controller
// PARTIAL: mentor.html

SU.controller('mentorController', function($scope, apiService, notifyService) {

    $scope.getMentorData = function() {
        return apiService
            .get('/user/assigned_mentor', null, {
                preventNotifications: true
            })
            .then(function(result) {
                $scope.$apply(function() {
                    $scope.mentor = result;
                });
            })
            // TODO: HANDLE ERRORING API
            .caught(notifyService.error);
    }();
});