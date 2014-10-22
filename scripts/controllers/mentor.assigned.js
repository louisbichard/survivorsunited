// TYPE:    controller
// PARTIAL: mentor.html
SU.controller('mentorController', function($scope, $http) {
    $scope.getMentorData = function() {
        return $http
            .get('http://localhost:3000/user/assigned_mentor')
            .success(function(data, status, headers, config) {
                $scope.mentor = data.result;
            })
            .error(function(data, status, headers, config) {
                //TODO: IMPLEMENT ALERT FOR FAILED API
                return false;
            });
    }();
});