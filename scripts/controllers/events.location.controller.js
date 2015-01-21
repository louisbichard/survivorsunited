SU.controller('eventsLocationController', function($scope, apiService, utilityService, notifyService, $http) {

    $scope.test = "Events location controller";
    $scope.map = {
        coords: {
            latitude: 53.41861187128951,
            longitude: -1.2568476197157605
        },
        zoom: 15
    };

    $scope.updateScope = function(data) {
        $scope.map.coords = {
            latitude: data.data.result.latitude,
            longitude: data.data.result.longitude
        };
    };

    $scope.renderMap = function(postcode) {
        $scope.lookupPostcode(postcode)
            .then($scope.updateScope);
    };

    apiService.get('/events/listall')
        .then(function(events) {
            // GET THE ONE'S WITH POSTCODES ONLY
            $scope.events = _.filter(events, 'postcode');
        });

    $scope.lookupPostcode = function(postcode) {
        postcode = postcode.replace(/ /g, '');

        // http://postcodes.io/docs
        return $http.jsonp('http://api.postcodes.io/postcodes/' + postcode + '?callback=JSON_CALLBACK')
            .success(function(data) {
                return data;
            });
    };

});