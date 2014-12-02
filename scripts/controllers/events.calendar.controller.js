SU.controller('eventCalendarController', function($scope, apiService, dateService, notifyService, $compile) {

    $scope.alertOnEventClick = function(date, jsEvent, view) {
        console.log('take to event');
    };

    // SET EVENTS AS NONE ON LOAD TO PREVENT ERROR
    $scope.events = [];

    $scope.uiConfig = {
        calendar: {
            header: {
                left: '',
                //left: 'month',   basicDay agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            eventClick: $scope.alertOnEventClick
        }

    };

    $scope.formatDates = function(event_item) {
        event_item = event_item || {};

        // ENSURE IT HAS ALL REQUIRED PROPS FOR OPERATION
        if (event_item.start && event_item.end && event_item.title) {
            event_item = _.pick(event_item, ['start', 'end', 'title', 'description']);
            event_item.start = dateService.formatTimeStampForCal(event_item.start);
            event_item.end = dateService.formatTimeStampForCal(event_item.end);
            $scope.events.push(event_item);
        }

    };

    $scope.setupScope = function(events) {
        //CLEAR EVENTS
        $scope.events.splice(0);

        // EDIT ALL EVENTS AND UPDATE SCOPE OF EVENTS
        events = _.each(events, $scope.formatDates);

        // LOAD CALENDAR ONTO PAGE
        $scope.calendar.fullCalendar('render');
    };

    $scope.notifyOfRefresh = function(notification) {
        if (notification) notifyService.success('Events refreshed!');
    };

    $scope.refreshEvents = function(notification) {
        return apiService
            .get('/events/listall', null, {
                preventNotifications: true
            })
            .then($scope.setupScope)
            .then(_.partial($scope.notifyOfRefresh, notification));
    };

    $scope.eventSources = [$scope.events];

    // BOOTSTRAP CONTROLLER
    $scope.refreshEvents();

});