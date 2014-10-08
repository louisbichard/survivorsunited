// create the module and name it survivorsUnited
var SU = angular.module('SU', ['ngRoute']);

SU.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../views/home.html',
            controller: 'mainController'
        }).when('/subscribed_events', {
            templateUrl: '../views/watched_events.html',
            controller: 'mainController'
        }).when('/watched_events', {
            templateUrl: '../views/subscribed_events.html',
            controller: 'mainController'
        })
        .when('/events_calendar', {
            templateUrl: '../views/events_calendar.html',
            controller: 'mainController'
        })
        .when('/login', {
            templateUrl: '../views/login.html',
            controller: 'aboutController'
        }).when('/search', {
            templateUrl: '../views/search.html',
            controller: 'aboutController'
        }).when('/messages', {
            templateUrl: '../views/messages.html',
            controller: 'aboutController'
        }).when('/notifications', {
            templateUrl: '../views/notifications.html',
            controller: 'aboutController'
        })
        .when('/upcoming_events', {
            templateUrl: '../views/upcoming_events.html',
            controller: 'aboutController'
        })
        .when('/create_event', {
            templateUrl: '../views/create_event.html',
            controller: 'aboutController'
        })
        .when('/mentor', {
            templateUrl: '../views/mentor.html',
            controller: 'aboutController'
        })
        .when('/forum', {
            templateUrl: '../views/forum.html',
            controller: 'aboutController'
        })
        .when('/account', {
            templateUrl: '../views/account.html',
            controller: 'mainController'
        })
        .otherwise({
            redirectTo: '/login'
        });
});

// create the controller and inject Angular's $scope
SU.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

SU.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});