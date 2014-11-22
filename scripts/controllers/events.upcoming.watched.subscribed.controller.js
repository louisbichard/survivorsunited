// TYPE: CONTROLLER
// PARTIAL: events_watched_subscribed_upcoming.html

SU.controller('upcomingWatchedSubscribedEventsController', function($scope, apiService, $location, dateService) {

    if ($location.$$path === '/watched_events') {
        $scope.title = "Watched";
        get_eventsapi = "/events/watching/current";
    }
    else if ($location.$$path === '/upcoming_events') {
        $scope.title = "Upcoming";
        get_eventsapi = "/events/listall";
    }
    else {
        //redirect
        throw new Error('url path incorrect');
    }

    //TODO: HANDLE IF THE URL IS NOT CORRECT

    $scope.bootstrap = function() {
        return apiService
            .get(get_eventsapi, null, {
                preventNotifications: true
            })
            .then($scope.formatDates);
    };

    $scope.formatDates = function(result) {
        result = result || [];
        $scope.events = dateService.formatDatesArray(result, ['start', 'end', 'date_created']);
    };

    //ADD USER AS WATCHING OR ATTENDING AN EVENT
    $scope.watchOrAttend = function(event_id, watchOrAttend) {
        if (!event_id || !watchOrAttend) {
            throw new Error('Cannot watch or attend event with no event id');
        }
        var endpoint = "/events/watchOrAttend";
        return apiService
            .post(endpoint, {
                type: watchOrAttend,
                id: event_id
            })
            .then(_.partial($scope.updateEvents, event_id, watchOrAttend, true));
    };

    // TAKES AN EVENT ID AND WATCHING AND ATTENDING AND SETS ITS VALUE
    $scope.updateEvents = function(event_id, watchOrAttend, value) {
        if (!event_id || !_.isString(event_id) || !watchOrAttend || !_.isString(watchOrAttend) || !value || !_.isBoolean(value)) {
            throw new Error('Incorrect parameters passed to updateEvents in upcoming.watched.subscribed controller');
        }

        // FIND EVENT KEY
        var key = _.findKey($scope.events, {
            _id: event_id
        });

        // ENSURE EVENT KEY EXISTS
        if (!key) throw new Error('Event ID is not valid'); // TODO: ADD SOME UI OUTPUT

        $scope.$apply(function() {
            $scope.events[key]['user_is_' + watchOrAttend] = value;
        });
    };

    //ADD USER AS WATCHING OR ATTENDING AN EVENT
    /*$scope.unWatchOrAttend = function(event_id, watchOrAttend) {
        // TODO: ALLOW A USER TO WATCH OR ATTEND AN EVENT
        console.log('unwatch or attend', watchOrAttend, event_id);
    };*/

    $scope.bootstrap();

});