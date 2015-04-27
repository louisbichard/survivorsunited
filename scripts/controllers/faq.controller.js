SU.controller('faqController', function($scope, $http) {
    $scope.test = "";

    $http.jsonp('https://data.police.uk/api/forces/west-yorkshire' + '?callback=JSON_CALLBACK')
        .success(function(data) {
            return data;
        });

});