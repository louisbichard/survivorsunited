SU.controller('usersWatchingEventController', function($scope, $http, $routeParams) {
    
    $scope.event_id =  $routeParams.id;
    $scope.type =  $routeParams.type;
    return $http
        .get('http://localhost:3000/events/listWatchersOrAttendees?id=' + $scope.event_id + '&type=' +$scope.type)
        .success(function(data, status, headers, config) {
            $scope.watchers = data.result;
        })
        .error(function(data, status, headers, config) {
            notification('Oh no!', 'Something went wrong when trying to fetch events!', 'error');
        });
        
});