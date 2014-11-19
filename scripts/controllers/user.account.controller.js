// TYPE:    controller
// PARTIAL: account.html
SU.controller('accountController', function($scope, apiService, $timeout, utilityService, notifyService) {
    $scope.user_original = {};

    $scope.bootstrap = function() {
        apiService.get('/user/current', null, {
                preventNotifications: true
            })
            .then(function(users) {
                $scope.$apply(function() {
                    $scope.user = users;
                    $scope.user_original = _.clone(users);
                });
            });
    };


    // ENSURE THAT THE REVIEW PANEL IS KEPT UP TO DATE
    $scope.$watch('user', function() {
        var current_user = _.clone($scope.user || {});
        if ($scope.user && $scope.user._id) {
            current_user.user_id = $scope.user._id;
        }

        var update_params = utilityService.objectDifferences($scope.user_original, current_user);

        // TODO: DESCRIBE
        if (_.keys(update_params).length !== 0) {
            $scope.update_params = update_params;
        }

    }, true);

    $scope.updateContact = function() {

        // ENSURE THAT THEY HAVE ALTERED SOME FIELDS
        if (_.keys($scope.update_params).length <= 1) {
            notifyService.warning('You have not updated any fields');
        }

        // SUCCESSFULLY REGISTER UPDATE
        else {
                apiService.post('/user/update', $scope.update_params, {
                    preventNotifications: true
                })
                .then(function() {
                    $scope.$apply(function() {
                        $scope.update_params = _.pick($scope.update_params, 'user_id');
                    });
                })
                .then(_.partial(notifyService.success, 'Profile fields updated'));
        }
    };

    $scope.bootstrap();

});