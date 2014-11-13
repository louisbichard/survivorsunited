// TYPE:    controller
// PARTIAL: account.html
SU.controller('accountController', function($scope, apiService, $timeout) {
    var user_original = {};

    //user.severity_grade == 'high'
    $scope.severity = function() {
        return true;
    };

    var assignUsersTo = function(users) {
        $scope.$apply(function(){
            $scope.user = users;
            user_original = _.clone(users);    
        });
    };

    apiService.get('/user/current').then(assignUsersTo);

    $scope.callUpdateAPI = function(update_data) {
        update_data = update_data || {};
        return apiService.post('/user/update', update_data);
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
            .then(function(data, status, headers, config) {
                notification('Profile fields updated');
            });
    };

});