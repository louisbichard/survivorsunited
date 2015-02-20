SU.controller('referralsController', function($scope, apiService, notifyService, dateService) {

    $scope.resetScope = function() {
        $scope.filters = {};
        notifyService.info('Cleared filters');
    };

    $scope.setFilter = function(prop, value) {
        $scope.filters[prop] = value;
    };

    $scope.updateReferral = function(details) {
        apiService.post('/referrals/update', {id: details._id, is_open: String(!details.is_open)})
            .then(function(){
                notifyService.success('Updated referral status');
                $scope.init();
            })
            .caught(function(){
                console.log('error thrown in updating referalls');
            });
    };

    $scope.init = function() {
        apiService.get('/referrals/listall')
            .then(function(referrals) {
                return dateService.formatDatesArray(referrals, ['date_added']);
            })
            .then(function(data) {
                $scope.referalls = data;
            });
    };

    $scope.filters = {};
    $scope.init();
});