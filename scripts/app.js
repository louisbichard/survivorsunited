// create the module and name it survivorsUnited
var SU = angular.module('SU', ['ngRoute']);



SU.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
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


