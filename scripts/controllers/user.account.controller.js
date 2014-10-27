// TYPE:    controller
// PARTIAL: account.html
SU.controller('accountController', function($scope, currentUserFactory, $http, $timeout) {
    var user_original = {};

    //user.severity_grade == 'high'
    $scope.severity = function() {
        return true;
    };

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

    $scope.$watch('user', function() {
        var current_user = _.clone($scope.user || {});
        var update_params = object_differences(user_original, current_user, {
            ignore: ['_id', 'id']
        });

        if (Object.keys(update_params).length !== 0) {
            $scope.update_params = update_params;
        }

    }, true);

    $scope.updateContact = function() {

        $scope.callUpdateAPI($scope.update_params)
            .success(function(data, status, headers, config) {
                notification('Profile fields updated');
            })
            .error(function(data, status, headers, config) {
                //TODO: IMPLEMENT ALERT FOR FAILED API
                return false;
            });
    };

});