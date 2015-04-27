SU.config(function($routeProvider) {
    $routeProvider

    // ROOT
        .when('/', {
        templateUrl: '../views/main/dashboard.html',
        controller: 'dashboardController'
    })

    // DASHBOARD
    .when('/dashboard', {
        templateUrl: '../views/main/dashboard.html',
        controller: 'dashboardController'
    })

    /////////////
    // ACCOUNT //
    /////////////

    // MENTOR
    .when('/mentor', {
        templateUrl: '../views/main/mentees.html',
        controller: 'menteesController'
    })

    // MENTEES
    .when('/mentees', {
        templateUrl: '../views/main/mentees.html',
        controller: 'menteesController'
    })

    // ACCOUNT
    .when('/account', {
        templateUrl: '../views/account/account.html',
        controller: 'accountController'
    })

    // LOGIN
    .when('/login', {
        templateUrl: '../views/utilities/login.html',
        controller: 'mainController'
    })

    //////////////
    // UTILTIES //
    //////////////

    //MAIN SEARCH PAGE
    .when('/search', {
        templateUrl: '../views/utilities/search.html',
        controller: 'searchController'
    })

    //SEARCH WITH QUERY
    .when('/search/:search_query', {
        templateUrl: '../views/utilities/search.html',
        controller: 'searchController'
    })

    // FAQ
    .when('/faq', {
        templateUrl: '../views/utilities/faq.html',
        controller: 'faqController'
    })

    //MAIN NOTIFICATIONS PAGE
    .when('/notifications', {
        templateUrl: '../views/main/notifications.html',
        controller: 'notificationController'
    })

    // FORUM
    .when('/forum', {
        templateUrl: '../views/utilities/forum.html',
        controller: 'mainController'
    })

    // FORUM
    .when('/credits', {
        templateUrl: '../views/utilities/credits.html'
    })

    // PROCESSES
    .when('/complete_task/:process_id/:task_id', {
        templateUrl: '../views/processes/complete_task.html',
        controller: 'completeTaskController'
    })

    .when('/select_process', {
        templateUrl: '../views/processes/select_process.html',
        controller: 'selectProcessController'
    })

    .when('/process_manager/:process_id', {
        templateUrl: '../views/processes/process_manager.html',
        controller: 'processManagerController'
    })

    .when('/task_editor/:process_id/:task_id', {
        templateUrl: '../views/processes/task_editor.html',
        controller: 'taskEditorController'
    })

    ////////////
    // EVENTS //
    ////////////

    //UPCOMING 
    .when('/upcoming_events', {
        templateUrl: '../views/events/events_watched_subscribed_upcoming.html',
        controller: 'upcomingWatchedSubscribedEventsController'
    })

    //UPCOMING 
    .when('/upcoming_events/:event_url_search', {
        templateUrl: '../views/events/events_watched_subscribed_upcoming.html',
        controller: 'upcomingWatchedSubscribedEventsController'
    })

    // WATCHING 
    .when('/users_watching_event', {
        templateUrl: '../views/events/users_watching_event.html',
        controller: 'usersWatchingEventController'
    })

    // CREATE EVENT
    .when('/create_event', {
        templateUrl: '../views/events/add_event.html',
        controller: 'addEventController'
    })

    // CALENDAR
    .when('/events_calendar', {
        templateUrl: '../views/events/events_calendar.html',
        controller: 'eventCalendarController'
    })

    // CALENDAR
    .when('/events_by_location', {
        templateUrl: '../views/events/events_by_location.html',
        controller: 'eventsLocationController'
    })

    // CALENDAR
    .when('/events_by_location/:event_id', {
        templateUrl: '../views/events/events_by_location.html',
        controller: 'eventsLocationController'
    })

    ///////////
    // ADMIN //
    ///////////

    // USER MANAGEMENT
    .when('/referrals', {
        templateUrl: '../views/admin/referrals.html',
        controller: 'referralsController'
    })

    // USER MANAGEMENT
    .when('/statistics', {
        templateUrl: '../views/admin/statistics.html',
        controller: 'statisticsController'
    })

    // USER DETAILS
    .when('/user_management', {
        templateUrl: '../views/admin/user_management.html',
        controller: 'userDetailsController'
    })

    .when('/user_management/search/:url_search', {
        templateUrl: '../views/admin/user_management.html',
        controller: 'userDetailsController'
    })

    // DEVELOPER CONSOLE
    .when('/developer_console', {
        templateUrl: '../views/admin/developer_console.html'
    })

    ///////////////
    // DEFAULT //
    ///////////////

    .when('/notfound', {
        templateUrl: '../views/utilities/notfound.html'
    })

    .otherwise({
        redirectTo: '/notfound'
    });
});