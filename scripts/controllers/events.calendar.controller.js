SU.controller('eventCalendarController', function($scope, apiService) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.changeTo = 'Hungarian';


    apiService.get('/events/listall').then(function(events) {
        //TODO: MAKE WORK
        /*        $scope.$watch(function() {
                    $scope.events = events.result;
                    $scope.eventSources = [$scope.events];
                }), true;*/

        //TODO, refresh scope
    });

    /* event source that contains custom events on the scope */
    $scope.events = [{
        title: 'All Day Event',
        start: new Date(y, m, 1)
    }, {
        title: 'Long Event',
        start: new Date(y, m, d - 5),
        end: new Date(y, m, d - 2)
    }];

    /* config object */
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

    //BIND EVENTS ON
    $scope.eventSources = [$scope.events];
});