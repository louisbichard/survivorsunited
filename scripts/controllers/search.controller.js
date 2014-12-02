SU.controller('searchController', function($scope, apiService, $location, notifyService) {
    $scope.search = $location.search();
});