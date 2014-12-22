// TYPE:    controller
// PARTIAL: account.html
SU.controller('accountController', function($scope, apiService, utilityService, notifyService, userDataService) {
    $scope.user_original = {};

    $scope.preferred_contact_methods = userDataService.preferred_contact_methods;

    $scope.bootstrap = function() {
        apiService.get('/user/current', null, {
                preventNotifications: true
            })
            .then(function(user_details) {
                $scope.$apply(function() {
                    $scope.user = user_details;
                    $scope.user_original = _.clone(user_details);
                });
            });
    };

    // ENSURE THAT THE REVIEW PANEL IS KEPT UP TO DATE
    $scope.userFieldChanged = function() {
        var current_user = _.clone($scope.user || {});

        // PASS USER ID THROUGH
        if (!$scope.user) throw new Error('No user ID found to set update fields');
        $scope.user_id = $scope.user._id || false;

        // SET UPDATE AS THE DIRTY PARAMETERS
        $scope.update_params = utilityService.objectDifferences($scope.user_original, current_user);
        $scope.updateContact();
    };

    $scope.updateContact = function() {

        // ENSURE THAT THEY HAVE AN ID (REQUIRED FOR API CALL)
        if (!$scope.user_id) throw new Error('Could not establish the users ID');
        else {
            $scope.update_params.user_id = $scope.user_id;
        }

        apiService.post('/user/update', $scope.update_params, {
                preventNotifications: true
            })
            .then(function() {
                $scope.$apply(function() {
                    $scope.update_params = _.pick($scope.update_params, 'user_id');
                });
            })
            .then(_.partial(notifyService.success, 'Profile updated'));

    };

    $scope.bootstrap();

});
