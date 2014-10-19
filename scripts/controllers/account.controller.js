// TYPE:    controller
// PARTIAL: account.html
SU.controller('accountController', function($scope, currentUserFactory, $http) {
    var user_original = {};

    var assignUsersTo = function(users) {
        var user_data = users.data.result;

        $scope.user = user_data;
        user_original = _.clone(user_data);
    };

    currentUserFactory
        .then(assignUsersTo);

    $scope.callUpdateAPI = function(update_data) {
        update_data = update_data || {};

        return $http
            .post('http://localhost:3000/user/update', update_data);
    };

    $scope.updateContact = function() {

        var current_user = _.clone(this.user);

        var update_params = object_differences(user_original, current_user, {
            ignore: ['_id', 'id']
        });

        this.callUpdateAPI(update_params)
            .success(function(data, status, headers, config) {
                REST_notification(data, 'Profile fields updated:');
            })
            .error(function(data, status, headers, config) {
                //TODO: IMPLEMENT ALERT FOR FAILED API
                return false;
            });
    };

});