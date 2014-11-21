SU.config(function($routeProvider) {
    $routeProvider

    // ROOT
        .when('/', {
        templateUrl: '../views/dashboard.html',
        controller: 'dashboardController'
    })

    // DASHBOARD
    .when('/dashboard', {
        templateUrl: '../views/dashboard.html',
        controller: 'dashboardController'
    })

    /////////////
    // ACCOUNT //
    /////////////

    // MENTOR
    .when('/mentor', {
        templateUrl: '../views/mentor.html',
        controller: 'mentorController'
    })

    // ACCOUNT
    .when('/account', {
        templateUrl: '../views/account.html',
        controller: 'accountController'
    })

    // LOGIN
    .when('/login', {
        templateUrl: '../views/login.html',
        controller: 'mainController'
    })

    //////////////
    // UTILTIES //
    //////////////

    //MAIN SEARCH PAGE
    .when('/search', {
        templateUrl: '../views/search.html',
        controller: 'mainController'
    })

    //MAIN NOTIFICATIONS PAGE
    .when('/notifications', {
        templateUrl: '../views/notifications.html',
        controller: 'mainController'
    })

    // FORUM
    .when('/forum', {
        templateUrl: '../views/forum.html',
        controller: 'mainController'
    })

    ////////////
    // EVENTS //
    ////////////

    //UPCOMING 
    .when('/upcoming_events', {
        templateUrl: '../views/events_watched_subscribed_upcoming.html',
        controller: 'upcomingWatchedSubscribedEventsController'
    })

    // WATCHING 
    .when('/users_watching_event', {
        templateUrl: '../views/users_watching_event.html',
        controller: 'usersWatchingEventController'
    })

    // CURRERNTLY WATCHED
    .when('/watched_events', {
        templateUrl: '../views/events_watched_subscribed_upcoming.html',
        controller: 'upcomingWatchedSubscribedEventsController'
    })

    // CREATE EVENT
    .when('/create_event', {
        templateUrl: '../views/create_event.html',
        controller: 'addEventController'
    })

    // SUBSCRIBED
    .when('/subscribed_events', {
        templateUrl: '../views/events_watched_subscribed_upcoming.html',
        controller: 'mainController'
    })

    // CALENDAR
    .when('/events_calendar', {
        templateUrl: '../views/events_calendar.html',
        controller: 'eventCalendarController'
    })

    // CALENDAR
    .when('/events_by_location', {
        templateUrl: '../views/events_by_location.html'
        // TODO: ADD CONTROLLER
    })

    ///////////
    // ADMIN //
    ///////////

    // USER MANAGEMENT
    .when('/statistics', {
        templateUrl: '../views/statistics.html',
        controller: 'userManagementController'
    })

    // USER DETAILS
    .when('/user_details', {
        templateUrl: '../views/user_details.html',
        controller: 'userDetailsController'
    })

    // ADD USER
    .when('/user_add', {
        templateUrl: '../views/user_add.html',
        controller: 'userAddController'
    })

    // DEVELOPER CONSOLE
    .when('/developer_console', {
        templateUrl: '../views/developer_console.html',
        controller: 'developerConsoleController'
    })

    ///////////////
    // DEFAULT //
    ///////////////
    
    .when('/notfound', {
        templateUrl: '../views/notfound.html'
    })

    .otherwise({
        redirectTo: '/notfound'
    });
});