SU.controller('searchController', function($scope, apiService, $location, notifyService, $route) {

    var url_search = $route.current.params.search_query;

    $scope.runSearch = function() {
        apiService.get('/search', {
            query: $scope.search
        }).then(function(search_results) {
            $scope.search_results = search_results;
        });
    };

    $scope.goToItem = function(path, search_data) {
        return $location.path(path)
            .search({
                search: search_data
            });
    };

    if (url_search) {
        $scope.search = url_search;
        $scope.runSearch();
    }

});