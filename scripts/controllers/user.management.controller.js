SU.controller('userDetailsController', function($scope, apiService, utilityService, notifyService, dateService, $route) {
    $scope.module = {
        title: "System users",
        description: "Edit users personal details, assigned mentors, severity etc",
    };

    $scope.users = [];
    $scope.updated = {};
    $scope.filters = [];

    // TODO: SHOULD BE IN SERVICE
    $scope.clearFilter = function(notification, config) {
        if (notification) {
            notifyService.info('Search filters cleared');
        }

        $scope.filters = _.map(['internal', 'severity', 'assigned_mentor', 'sort'], function(filter_name) {
            return {
                name: filter_name,
                value: config[filter_name] ? config[filter_name] : "All"
            };
        });

        $scope.searchText = "";
    };

    $scope.setFilter = function(name, value) {
        //TODO test
        if (!name || !value || !_.isString(name)) {
            throw new Error('Incorrect parametrs passed to SetFilter');
        }

        var index =
            _.chain($scope.filters)
            .findIndex({
                name: name
            })
            .value();

        if (index === -1) {
            throw new Error('Index for filter not found in user details controller');
        }

        $scope.filters[index].value = value;
    };

    $scope.spliceUser = function(users_index) {
        if (!_.isNumber(users_index)) {
            throw new Error('No user index found to remove');
        }
        $scope.$apply(function() {
            $scope.users = $scope.users;
            $scope.users.splice(users_index, 1);
        });
    };

    $scope.removeUserFromScope = function(user) {
        if (!user) {
            throw new Error("No user found in removeUserFromScope");
        }

        var users_index = _.findIndex($scope.users, user);
        $scope.users[users_index].removed = true;

        // REMOVE USER FROM SCOPE AFTER DELAY
        _.delay(_.partial($scope.spliceUser, users_index), 1000);
    };

    $scope.removeUser = function(user) {

        if (!user || !user._id) {
            throw new Error('user and user id must be passed to removeUser in userDetailsController');
        }

        // TODO: ADD CONFIRMATION MESSAGE 

        return apiService
            .post('/user/delete', {
                id: user._id
            }, {
                preventNotifications: true
            })

        // NOTIFY
        .then(_.partial(notifyService.success, 'Removed user'))

        // REMOVE FROM SCOPE
        .then(_.partial($scope.removeUserFromScope, user));

    };

    $scope.updatedContact = function(localScope) {
        if (!localScope || !localScope.user._id) {
            throw new Error('localScope did not have all correct values to update contact in updatedContact');
        }
        var user_id = localScope.user._id;
        var changes = $scope.updated[user_id];
        changes.user_id = changes._id;
        changes = _.omit(changes, 'date_created');
        apiService.post('/user/update', changes)
            .then(function() {
                notifyService.success('updated details');
            });
    };

    $scope.filterMentors = function(user) {
        return user.role === "Mentor";
    };

    $scope.createUpdateObject = function(user) {
        $scope.updated[user._id] = user;
    };

    $scope.setupScope = function(result) {
        $scope.$apply(function() {
            $scope.users = result;
            $scope.original_users = result;
            $scope.mentors = _.filter($scope.users, $scope.filterMentors);
            $scope.mentors.unshift({
                _id: false,
                username: "Unassigned"
            });

            // THIS TAKES ALL INCOMING USERS AND CREATES AN OBJECT BASED ON ID'S SO THAT  USERS
            // CAN BE UPDATED INDEPEDENTLY
            _.each(result, $scope.createUpdateObject);
        });
    };

    $scope.refreshNotification = function(notification) {
        if (notification) notifyService.success('Refreshed users');
    };

    // AUTOMATICALLY INVOKED
    $scope.refreshUsers = function(notification) {

        apiService.get('/users/listall', null, {
                preventNotifications: true
            })
            .then(_.partialRight(dateService.formatDatesArray, ['date_created']))
            .then($scope.setupScope)
            .then(_.partial($scope.refreshNotification, notification));
    };

    // LAUNCH INIT SCOPE FUNCTIONS
    $scope.clearFilter(false, $route.current.params);

    $scope.refreshUsers();

    var url_search = $route.current.params.url_search;

    if (url_search) {
        $scope.searchText = url_search;
    }
});