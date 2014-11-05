SU.controller('mainController', function($scope, $http, apiService, $location) {

    //TODO: REMOVE -> WAS USING WHEN IMPLEMENTING TEST FRAMEWORK
    $scope.test = "test";

    $scope.anonymous_user = false;

    $scope.bootstrapDashboard = function() {

        apiService.get('/user/current', null, {
                preventNotifications: true
            })
            .then(function(result) {
                var welcome_message;


                welcome_message = "Welcome back! ";

                if (result && result.first_name) {
                    welcome_message += result.first_name;
                } else if (result && result.username) {
                    welcome_message += result.username;
                }

                $scope.$apply(function() {
                    $scope.profile_link = "#account";
                    $scope.welcome_message = welcome_message;
                    $scope.anonymous_user = false;
                });


                $scope.setAppLoaded();

                //TODO: ADD IN FOR PROD
                //_.delay($scope.setAppLoaded, 2300);

            })
            .caught(function(err) {
                $scope.setAppLoaded();

                //TODO: ADD IN FOR PROD
                //_.delay($scope.setAppLoaded, 2300);
                //
                $scope.$apply(function() {
                    $scope.anonymous_user = true;
                    $scope.profile_link = "#login";
                    $scope.welcome_message = "Login";
                });
            });

    }();

    $scope.setAppLoaded = function() {
        $scope.$apply(function() {
            $scope.app_loaded = true;
        });
    };

    $scope.pushToDashboard = function(arg) {

    };

    $scope.logOut = function() {
        apiService
            .get('/auth/logout')
            .then($scope.bootstrapDashboard)
            .then(function() {
                $location.path('#dashboard');
            });
    };

    $scope.mainLogin = function(user) {
        console.log('attempting login');
        return apiService
            .post('/auth/login', user)
            .then(function() {
                $location.path('#dashboard');
            });
    };
});