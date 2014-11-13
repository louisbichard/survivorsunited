SU.controller('usersWatchingEventController', function($scope, $http, $routeParams, apiService) {

    $scope.event_id = $routeParams.id;
    $scope.type = $routeParams.type;
    return apiService.get('/events/listWatchersOrAttendees?id=' + $scope.event_id + '&type=' + $scope.type)
        .then(function(data) {
            $scope.watchers = data.result;
        });
});