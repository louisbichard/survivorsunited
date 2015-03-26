SU.controller('mainController', function($scope, apiService, $location, notifyService, navigationRoutesService) {

    $scope.navigation_routes = navigationRoutesService.routes;

    $scope.referral = {};

    $scope.canViewNavHeading = function(nav_values, role) {
        return _.reduce(nav_values.sub_routes, function(prev, link) {
            if (link.allowed_roles.indexOf(role) > -1) prev = true;
            return prev;
        }, false);
    };

    $scope.canViewNavLink = function(allowed_roles, role) {
        //return true;
        return allowed_roles.indexOf(role) > -1;
    };

    // WATCH FOR NAV CHANGES AND SETUP SCOPE FOR LEFT PANEL TABBING HIGHLIGHTING
    $scope.region = "Select region";

    // PREFERRED CONTACT MUST BE PRE POPULATED SO THAT IT CAN BE SET IN THE SELECT BOX
    $scope.new_account = {
        contact_method: 'Preferred contact method'
    };

    // USED FOR THE ACTIVE TABS ON THE DASHBOARD
    $scope.$on('$locationChangeSuccess', function() {
        $scope.current_location = $location.path()
            .split('/')[1];
    });

    $scope.submitReferral = function() {
        apiService.post('/referrals/insert', $scope.referral)
            .then(_.partial(notifyService.success, 'Submitted referral'));
    };

    $scope.createAccount = function() {
        var account = $scope.new_account;
        if (account.password && account.password_confirm && (account.password === account.password_confirm)) {
            apiService
                .post('/user/add', $scope.new_account, {
                    preventNotifications: true
                })
                .then(notifyService.success)
                .caught(notifyService.error);
        } else {
            notifyService.error('Passwords did not match');
        }
    };

    /* Remove if you don't want to animate the sidebar */
    $scope.sidebar = {
        toggle: function(show_sidebar) {
            //$scope.toggle = show_sidebar;
        }
    };

    $scope.runSearch = function() {
        $location.path('/search/' + $scope.search_text);
    };

    $scope.routeToLogin = function() {
        window.location = "http://" + window.location.hostname + '#/login';
    };

    $scope.bindUserToScope = function(user) {
        $scope.$apply(function() {
            $scope.user_details = user;
        });
    };

    $scope.bootstrapDashboard = function() {
        return apiService
            .get('/user/current', null, {
                preventNotifications: true
            })
            .then($scope.bindUserToScope)
            .caught($scope.routeToLogin);
    };

    $scope.mainLogOut = function() {
        return apiService
            .get('/auth/logout', null, {
                preventNotifications: true
            })
            .then($scope.routeToLogin);
    };

    $scope.mainLogin = function(user) {
        return apiService
            .post('/auth/login', user, {
                preventNotifications: true
            })
            .then(function() {
                return window.location = "http://" + window.location.hostname + '#/dashboard';
            })
            .caught(notifyService.error);
    };

    $scope.bootstrapDashboard();
});