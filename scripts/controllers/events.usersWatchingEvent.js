SU.controller('usersWatchingEventController', function($scope, $http, $routeParams) {
    
    $scope.event_id =  $routeParams.id;
    return $http
        .get('http://localhost:3000/events/listwatchers?id=' + $scope.event_id, $scope.add_event)
        .success(function(data, status, headers, config) {
            $scope.watchers = data.result;
        })
        .error(function(data, status, headers, config) {
            notification('Oh no!', 'Something went wrong when trying to fetch events!', 'error');
        });
        
});