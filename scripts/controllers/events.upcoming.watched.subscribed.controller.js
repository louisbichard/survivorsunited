// TYPE: CONTROLLER
// PARTIAL: 

SU.controller('upcomingWatchedSubscribedEventsController', function($scope, apiService, $location) {

    if ($location.$$path === '/watched_events') {
        $scope.title = "Watched";
        get_eventsapi = "/events/watching/current";
    } else {
        $scope.title = "Upcoming";
        get_eventsapi = "/events/listall";
    }

    $scope.module = {
        title: $scope.title + ' events',
        description: "Browser, watch or register for upcoming events"
    };

    var get_events = function() {
        return apiService
            .get(get_eventsapi, null, {preventNotifications: true})
            .then(function(result) {
                $scope.$apply(function() {
                    $scope.events = _.map(result, function(event_item) {
                        event_item.start = moment(event_item.start).format('do, MMMM, YYYY');
                        event_item.end = moment(event_item.end).format('do, MMMM, YYYY');
                        event_item.date_created = moment(event_item.date_created).format('do, MMMM, YYYY');
                        return event_item;
                    });
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