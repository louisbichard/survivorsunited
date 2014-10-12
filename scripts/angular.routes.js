SU.config(function($routeProvider) {
    $routeProvider

    // ROOT ROUTE
    // ==========
    .when('/', {
        templateUrl: '../views/home.html',
        controller: 'mainController'
    })

    // ACCOUNT
    // =======
    .when('/mentor', {
        templateUrl: '../views/mentor.html',
        controller: 'aboutController'
    })
        .when('/account', {
            templateUrl: '../views/account.html',
            controller: 'accountController'
        })
        .when('/user_management', {
            templateUrl: '../views/user_management.html',
            controller: 'userManagementController'
        })
        .when('/login', {
            templateUrl: '../views/login.html',
            controller: 'loginController'
        })


    // UTILTIES
    // =======
    .when('/search', {
        templateUrl: '../views/search.html',
        controller: 'aboutController'
    })
        .when('/messages', {
            templateUrl: '../views/messages.html',
            controller: 'aboutController'
        })
        .when('/notifications', {
            templateUrl: '../views/notifications.html',
            controller: 'aboutController'
        })

    // EVENT ROUTES
    // ============
    .when('/upcoming_events', {
        templateUrl: '../views/upcoming_events.html',
        controller: 'aboutController'
    })
        .when('/create_event', {
            templateUrl: '../views/create_event.html',
            controller: 'aboutController'
        })
        .when('/subscribed_events', {
            templateUrl: '../views/watched_events.html',
            controller: 'mainController'
        })
        .when('/watched_events', {
            templateUrl: '../views/subscribed_events.html',
            controller: 'mainController'
        })
        .when('/events_calendar', {
            templateUrl: '../views/events_calendar.html',
            controller: 'mainController'
        })


    // FORUM
    // =====
    .when('/forum', {
        templateUrl: '../views/forum.html',
        controller: 'aboutController'
    })


    // OTHERWISE
    // =========
    .otherwise({
        redirectTo: '/login'
    });
});