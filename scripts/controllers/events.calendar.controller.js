SU.controller('eventCalendarController', function($scope, apiService, dateService, notifyService) {

    // SET EVENTS AS NONE ON LOAD TO PREVENT ERROR
    $scope.events = [];

    $scope.uiConfig = {
        calendar: {
            header: {
                left: '',
                //left: 'month',   basicDay agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            }
        }
    };

    $scope.refreshEvents = function() {
        $scope.getEvents()
            .then(function() {
                notifyService.success('Events refreshed!');
            });
    };


    $scope.getEvents = function() {
        return apiService
            .get('/events/listall', null, {
                preventNotifications: true
            })
            .then(function(events) {

                //CLEAR EVENTS
                $scope.events.splice(0);

                // EDIT ALL EVENTS AND UPDATE SCOPE OF EVENTS
                events = _.each(events, function(event_item) {
                    //CONVERT DATES
                    event_item = _.pick(event_item, ['start', 'end', 'title']);
                    event_item.start = dateService.formatTimeStampForCal(event_item.start);
                    event_item.end = dateService.formatTimeStampForCal(event_item.end);
                    $scope.events.push(event_item);
                });

                // LOAD CALENDAR ONTO PAGE
                $scope.calendar.fullCalendar('render');
                return;
            });
    };

    $scope.eventSources = [$scope.events];





    // BOOTSTRAP CONTROLLER
    $scope.getEvents();

});