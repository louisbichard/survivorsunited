SU.controller('userDetailsController', function($scope, apiService, allUsersFactory, utilityService, notifyService) {

    $scope.users = [];

    $scope.module = {
        title: "System users",
        description: "Edit users personal details, assigned mentors, severity etc",
    };

    $scope.updated = {
        '545a17fe979e5cea2aa2268e': {}
    };

    $scope.filters = [{
        name: 'internal',
        friendly: 'Internal Users',
        checked: false
    }, {
        name: 'external',
        friendly: 'External Users',
        checked: false
    }, {
        name: 'no_assigned_mentor',
        friendly: 'No assigned mentor',
        checked: false
    }, {
        name: 'high_severity',
        friendly: 'High severity users',
        checked: false
    }];

    $scope.removeUser = function(user) {

        // TODO: COMPLETE AS DIRECTIVE
        notifyService.question("Confirm deleting user?");

        return apiService

        // CALL API
            .post('/user/delete', {
            id: user._id
        })

        // FIND USER ITEM FROM SCOPE
        .then(function() {
            return _.findWhere($scope.users, user);
        })

        // FIND INDEX OF USER
        .then(function(user_to_remove) {
            return _.findIndex($scope.users, function(item) {
                return item._id === user_to_remove._id;
            });
        })

        // REMOVE FROM SCOPE
        .then(function(index_to_remove) {
            $scope.$apply(function() {
                $scope.users.splice(index_to_remove, 1);
            });
        });
    };

    $scope.updatedContact = function(localScope) {
        if (!localScope.user._id) {
            throw new Error('localScope did not have all correct values to update contact in updatedContact');
        }


        var user_id = localScope.user._id;
        var changes = $scope.updated[user_id];
        changes.user_id = changes._id;
        changes = _.omit(changes, 'date_created');

        apiService.post('/user/update', changes)
            .then(function() {
                //IF SUCCESSFUL CLEAN UPDATES

            });
    };

    // AUTOMATICALLY INVOKED
    var refreshUsers = function() {

        allUsersFactory

        // GET RESULT DATA
            .then(function(result) {
            return result.data.result;
        })

        // ASSIGN RESULTS TO SCOPE VARIABLES
        .then(function(result) {
            $scope.users = result.users;
            $scope.original_users = result.users;
            $scope.mentors = result.users; // TODO: FILTER BY ROLE TYPE
            _.each(result.users, function(user) {
                $scope.updated[user._id] = user;
            });
        });
    }();
});