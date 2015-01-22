SU.controller('searchController', function($scope, apiService, $location, notifyService) {
    $scope.search = $location.search();
    console.log('in search');
});