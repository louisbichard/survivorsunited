// TYPE: CONTROLLER
// PARTIAL: 

SU.controller('upcomingEventsController', function($scope, apiService, $location) {

    if ($location.$$path === '/watched_events') {
        $scope.title = "Watched";
        get_eventsapi = "/events/watching/current";
    } else {
        $scope.title = "Upcoming";
        get_eventsapi = "/events/listall";
    }

    $scope.module = {
        title: $scope.title + 'events',
        description: "Browser, watch or register for upcoming events"
    };

    var get_events = function() {
        return apiService
            .get(get_eventsapi, null, {preventNotifications: true})
            .then(function(result) {
                $scope.$apply(function() {
                    $scope.events = result;
                });
            });
    }();

    //ADD USER AS WATCHING OR ATTENDING AN EVENT
    $scope.watchOrAttend = function(event_id, watchOrAttend) {

        var endpoint = "/events/watchOrAttend";

        return apiService
            .post(endpoint, {
                type: watchOrAttend,
                id: event_id
            });
    };


});