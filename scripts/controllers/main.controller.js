SU.controller('mainController', function($scope, apiService, $location, notifyService) {

    // WATCH FOR NAV CHANGES AND SETUP SCOPE FOR LEFT PANEL TABBING HIGHLIGHTING
    $scope.region = "Select region";

    // USED FOR THE ACTIVE TABS ON THE DASHBOARD
    $scope.$on('$locationChangeSuccess', function() {
        $scope.current_location = $location.path()
            .split('/')[1];
    });

    $scope.runSearch = function() {
        $location.path('/search')
            .search({
                search: $scope.search_text
            });
    };

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
    };

    $scope.routeToLogin = function() {
        $location.path('login');
    };

    $scope.successfulLogin = function(result) {
        $scope.$apply(function() {
            $location.path('/dashboard');
            $scope.anonymous_user = false;
        });
    };

    $scope.bootstrapDashboard = function() {
        return apiService
            .get('/user/current', null, {
                preventNotifications: true
            })
            .then($scope.successfullLogin)
            .caught($scope.routeToLogin);
    };

    $scope.mainLogOut = function() {
        return apiService
            .get('/auth/logout', {
                preventNotifications: true
            })
            .then($scope.routeToLogin);
    };

    $scope.mainLogin = function(user) {
        return apiService
            .post('/auth/login', user, {
                preventNotifications: true
            })
            .then($scope.successfulLogin)
            .caught(notifyService.error);
    };

    $scope.bootstrapDashboard();
});