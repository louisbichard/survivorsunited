SU.controller('loginController', function($scope, $http) {
    $scope.test = "Controller is login";
    $scope.user = {};
    $scope.login = function(user){
        console.log('so you want to login eh?' + user.username);
       return $http
            .post('http://localhost:3000/auth/login', $scope.user)
            .success(function(data, status, headers, config) {
                if (data.success) {
                    notification("Logged in!");
                } else {
                    notification('Oh no!', data.error_message, 'error');
                }
            })
            .error(function(data, status, headers, config) {
                notification('Oh no!', 'Something went wrong when trying to login!', 'error');
                return false;
            });
    };
    
});