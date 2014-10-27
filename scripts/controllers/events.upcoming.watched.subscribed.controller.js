// TYPE: CONTROLLER
// PARTIAL: 

SU.controller('upcomingEventsController', function($scope, $http, $location) {
    var api_route = APP.utilties.api_route;

    if ($location.$$path === '/watched_events') {
        $scope.title = "Watched";
        get_eventsapi = api_route + "/events/watching/current";
    } else {
        $scope.title = "Upcoming";
        get_eventsapi = api_route +  "/events/listall";
    }

    $scope.test = "Controller is upcoming events";

    var get_events = function() {
        return $http
            .get(get_eventsapi)
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

    //ADD USER AS WATCHING OR ATTENDING AN EVENT
    $scope.watchOrAttend = function(event_id, watchOrAttend) {

        var endpoint = "/events/watchOrAttend";

        return $http
            .post(api_route + endpoint, {
                type: watchOrAttend,
                id: event_id
            })
            .success(function(data, status, headers, config) {
                REST_notification(data);
            })
            .error(function(data, status, headers, config) {
                notification('Oh no!', 'Something went wrong when trying to fetch events!', 'error');
            });
    };


});