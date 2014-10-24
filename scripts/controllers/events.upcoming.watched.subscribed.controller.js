// TYPE: CONTROLLER
// PARTIAL: 

SU.controller('upcomingEventsController', function($scope, $http, $location) {
    var api = APP.utilties.api_route;

    if($location.$$path === '/watched_events') {
        $scope.title = "Watched";
        api += "/events/watching/current";
    }
    else {
        $scope.title = "Upcoming";
        api += "/events/listall";
    }

    $scope.test = "Controller is upcoming events";

    var get_events = function() {
        return $http
            .get(api)
            .success(function(data, status, headers, config) {
                $scope.events = data.result.result;
                $scope.events_count = data.result.count;
            })
            .error(function(data, status, headers, config) {
                notification('Oh no!', 'Something went wrong when trying to fetch events!', 'error');
            });
    };

    $scope.init = function() {
        return get_events();
    }();

});