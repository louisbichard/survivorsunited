SU.controller('userDetailsController', function($scope, apiService, allUsersFactory) {

    $scope.removeUser = function(user) {

        return apiService
            .post('/user/delete', {
                id: user._id
            })
            .then(function(data) {
                //REFRESH SCOPE
                var user_to_remove = _.findWhere($scope.users, user);

                var index = _.findIndex($scope.users, function(item) {
                    return item._id === user_to_remove._id
                });
                $scope.$apply(function() {
                    $scope.users.splice(index, 1);
                });
            })
            .caught(function() {
                // TODO: HANDLE WHEN THE API ERRORS
            });
    };

    $scope.updateContact = function(user) {


        //TODO: MAKE THIS WORK
        /*var original_user = _.findWhere($scope.original_users, {_id: id});
        object_differences(original_user, changed_user);*/

        changed_user = _.omit(user, ['$$hashKey', '_id', 'id']);
        debugger;
        //FIND ORIGINAL DETAILS OF USER

        return apiService
            .post('/user/update', changed_user)
            .then(function(data) {
                //TODO: REFRESH USERS ON PAGE
            })
            .caught(function() {
                // TODO: HANDLE WHEN THE API ERRORS
            });
    };

    $scope.$watch('users', function() {
        console.log('users have changed');
    }, true);

    // AUTOMATICALLY INVOKED
    var refreshUsers = function() {
        $scope.users = [];
        allUsersFactory.then(function(users) {
            var user_data = users.data.result.users;

            //SETUP USERS FOR LIST
            $scope.users = user_data;

            //USELESS UNTIL UPDATE FUNCTION WORKS
            $scope.original_users = user_data;

            //SETUP USER RESULT COUNT
            // TODO: DOESNT UPDATE WHEN YOU DELETE
            $scope.user_count = users.data.result.count;
        });
    }();
});