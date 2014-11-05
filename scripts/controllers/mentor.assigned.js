// TYPE:    controller
// PARTIAL: mentor.html
SU.controller('mentorController', function($scope, apiService) {
    $scope.module = {
        title: "My Mentor",
        description: "Mentor contact details, description and instant message"
    };

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
            .caught(function() {
                //TODO: Prevent error here in some way
            });
    }();
});