SU.controller('mainController', function($scope, apiService, $location) {

    // WATCH FOR NAV CHANGES AND SETUP SCOPE FOR LEFT PANEL TABBING HIGHLIGHTING
    $scope.$on('$locationChangeSuccess', function() {
        $scope.current_location = $location.path().split('/')[1];
    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
    };

    $scope.successfullLogout = function() {
        $scope.$apply(function() {
            // TODO: A FILTHY FILTHY HACK, THERE MUST BE SOME ANGULAR WAY OF DOING THIS
            //$location.path('/login');
            $scope.anonymous_user = true;
        });
    };

    $scope.successfullLogin = function(result) {
        $scope.$apply(function() {
            // TODO: A FILTHY FILTHY HACK, THERE MUST BE SOME ANGULAR WAY OF DOING THIS
            // $location.path('/dashboard');
            $scope.anonymous_user = false;
        });
    };

    $scope.bootstrapDashboard = function() {
        return apiService
            .get('/user/current', null, {
                preventNotifications: true
            })
            .then($scope.successfullLogin);
    };

    $scope.mainLogOut = function() {
        return apiService
            .get('/auth/logout')
            .then($scope.successfulLLogout);
    };

    $scope.mainLogin = function(user) {
        return apiService
            .post('/auth/login', user)
            .then($scope.successfullLogin);
    };

    $scope.bootstrapDashboard();
});