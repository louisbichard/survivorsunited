SU.controller('mainController', function($scope, $http) {
    $scope.test = "main controller!";
    $http
        .get('http://localhost:3000/user/current')
        .success(function(data, status, headers, config) {
            var welcome_message;
            var result = data.result;

            if (data.success) {
                welcome_message = "Welcome back! ";
                if (result && result.first_name) welcome_message += result.first_name;
                else if (result && result.username) welcome_message += result.username;
                $scope.profile_link = "#account";
            } else {
                redrawUIAnon();
            }

            $scope.profile_link = "#account";
            $scope.welcome_message = welcome_message;

        })
        .error(function(data, status, headers, config) {
            // TODO : BETTER ERROR HANDLING 
            console.log('is authenticated!');
        });

    var redrawUIAnon = function() {
        $scope.profile_link = "#login";
        $scope.welcome_message = "Login";
    };

    $scope.logOut = function() {
        $http
            .get('http://localhost:3000/auth/logout')
            .success(function(data, status, headers, config) {
                notification('Successfully logged out!');
            })
            .error(function(data, status, headers, config) {
                // TODO : BETTER ERROR HANDLING 
                console.log('Something went wrong!');
            });

        console.log('log out!');
    };
});