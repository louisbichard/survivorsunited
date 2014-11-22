// TYPE: CONTROLLER
// PARTIAL: 
SU.controller('addEventController', function($scope, apiService, utilityService, notifyService) {

    $scope.open = function(scope_prop, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope[scope_prop] = !$scope[scope_prop];
    };

    $scope.format = utilityService.date_format;

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.clearEvent = function() {
        $scope.add_event = {};
        notifyService.success('Cleared form');
    };

    $scope.addEvent = function() {

        //TODO: VALIDATE THAT ALL DATA HAS BEEN ENTERED 
        var new_event = utilityService.convertDatesToTimeStamps($scope.add_event, ['start, end']);
        return apiService.post('/events/add', new_event);
    };

});