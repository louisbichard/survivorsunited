// TYPE: CONTROLLER
// PARTIAL: 

SU.controller('addEventController', function($scope, $http, $location) {
    $scope.module = {
        title: "Create event",
        description: "Setup custom events"
    };

    $scope.addEvent = function() {

        //TODO: VALIDATE THAT ALL DATA HAS BEEN ENTERED 
        return $http
            .post('http://localhost:3000/events/add', $scope.add_event)
            .success(function(data, status, headers, config) {
                REST_notification(data, 'Added event');
            })
            .error(function(data, status, headers, config) {
                notification('Oh no!', 'Something went wrong when trying to fetch events!', 'error');
            });

    };

});