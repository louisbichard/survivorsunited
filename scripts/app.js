// create the module and name it survivorsUnited
var SU = angular.module('SU', ['ngRoute']);



SU.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

// create the controller and inject Angular's $scope
SU.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

SU.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});



SU.factory("registerUserFactory", function($http) {
    console.log('updated user');
    return;
});


SU.factory("allUsersFactory", function($http) {
    return $http
        .get('http://localhost:3000/user/listall')
        .success(function(data, status, headers, config) {
            return _.map(data, function(user) {
                var unix_date = user.date_created;
                var js_date = new Date(unix_date);
                user.date_created = moment(js_date).format('Do MMM YYYY, HH:mm');
                return user;
            });
        })
        .error(function(data, status, headers, config) {
            // **TODO:** Imlement better error handling
            return false;
        });
});