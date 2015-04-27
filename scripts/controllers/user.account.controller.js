// TYPE:    controller
// PARTIAL: account.html
SU.controller('accountController', function($scope, apiService, $timeout, utilityService, notifyService) {
    $scope.user_original = {};

    $scope.bootstrap = function() {
        apiService.get('/user/current', null, {
                preventNotifications: true
            })
            .then(function(user_details) {
                $scope.$apply(function() {
                    $scope.user = user_details;
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

    };


    $scope.updateContact = function(prop, value) {

        // GENERATE PARAMS
        var payload = {
            user_id: $scope.user._id
        };
        payload[prop] = value;

        // UPDATE USER CONTACT DETAILS
        apiService.post('/user/update', payload, {
                preventNotifications: true
            })
            .then(_.partial(notifyService.success, 'Profile fields updated'));
    };

    $scope.bootstrap();

});