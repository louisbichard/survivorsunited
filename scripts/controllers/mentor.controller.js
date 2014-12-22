// TYPE:    controller
// PARTIAL: mentor.html

SU.controller('mentorController', function($scope, apiService, notifyService) {

    $scope.assignPropToScope = function(prop, data) {
        $scope.$apply(function() {
            $scope[prop] = data;
        });
    };

    // TODO: PASS IN MENTOR AS A STRING NOT HARDCODE
    $scope.assignToScope = function(result) {
        if (_.isPlainObject(result)) $scope.assignPropToScope('mentor', result);
    };

    $scope.getMentorData = function() {
        return apiService
            .get('/user/assigned_mentor', null, {
                preventNotifications: true
            })
            .then($scope.assignToScope)
            .caught(notifyService.error);
    }();
});
