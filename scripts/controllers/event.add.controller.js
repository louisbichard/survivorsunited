// TYPE: CONTROLLER
// PARTIAL: 

SU.controller('addEventController', function($scope, apiService, utilityService) {

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        var scope_prop = _.pick($event.target.attributes, 'data-opened')['data-opened'].value;
        $scope[scope_prop] = true;
    };

    $scope.format = utilityService.date_format;

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.addEvent = function() {
        
        //TODO: VALIDATE THAT ALL DATA HAS BEEN ENTERED 
        var new_event = utilityService.convertDatesToTimeStamps($scope.add_event, ['start, end']);
        return apiService.post('/events/add', new_event);
    };

});