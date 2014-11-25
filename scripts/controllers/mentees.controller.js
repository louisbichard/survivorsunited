// TYPE:    controller
// PARTIAL: mentees.html

SU.controller('menteesController', function($scope, apiService, dateService) {

    // TODO: FILTER OUT THE MENTER THEMSELVES
    $scope.filterOutSelf = function(mentee) {
        return mentee;
    };

    $scope.getMenteeData = function() {
        return apiService
            .get('/user/assigned_mentees', null, {
                preventNotifications: true
            })
            .then(function(result) {
                $scope.$apply(function() {
                    $scope.mentees = _.filter(result, $scope.filterOutSelf);
                    $scope.mentees = dateService.formatDatesArray($scope.mentees, ['date_created']);
                });
            });
    };

    $scope.getMenteeData();
});