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
            controller: 'mentorController'
        })
        .when('/account', {
            templateUrl: '../views/account.html',
            controller: 'accountController'
        })
        .when('/user_management', {
            templateUrl: '../views/user_management.html',
            controller: 'userManagementController'
        })
     .when('/user_details', {
            templateUrl: '../views/user_details.html',
            controller: 'userDetailsController'
        })
          .when('/user_add', {
            templateUrl: '../views/user_add.html',
            controller: 'userAddController'
        })
        .when('/login', {
            templateUrl: '../views/login.html',
            controller: 'loginController'
        })





    // UTILTIES
    // =======

    //MAIN SEARCH PAGE
    .when('/search', {
        templateUrl: '../views/search.html',
        controller: 'loginController'
    })

    //MAIN NOTIFICATIONS PAGE
    .when('/notifications', {
        templateUrl: '../views/notifications.html',
        controller: 'loginController'
    })




    // EVENT ROUTES
    // ============

    //UPCOMING EVENTS PAGE
    .when('/upcoming_events', {
        templateUrl: '../views/events_watched_subscribed_upcoming.html',
        controller: 'upcomingEventsController'
    })

    //USERS WATCHING AN EVENT
    .when('/users_watching_event', {
        templateUrl: '../views/users_watching_event.html',
        controller: 'usersWatchingEventController'
    })

    //USERS CURRERNTLY WATCHED EVENTS
    .when('/watched_events', {
        templateUrl: '../views/events_watched_subscribed_upcoming.html',
        controller: 'upcomingEventsController'
    })


    .when('/create_event', {
            templateUrl: '../views/create_event.html',
            controller: 'addEventController'
        })
        .when('/subscribed_events', {
            templateUrl: '../views/events_watched_subscribed_upcoming.html',
            controller: 'mainController'
        })
        .when('/events_calendar', {
            templateUrl: '../views/events_calendar.html',
            controller: 'eventCalendarController'
        })


    // FORUM
    // =====
    .when('/forum', {
        templateUrl: '../views/forum.html',
        controller: 'loginController'
    })


    // OTHERWISE
    // =========
    .otherwise({
        redirectTo: '/login'
    });
});