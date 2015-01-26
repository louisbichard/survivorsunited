SU.controller('referralsController', function($scope, apiService, notifyService, dateService) {

    $scope.resetScope = function() {
        $scope.filters = {};
        notifyService.info('Cleared filters');
    };

    $scope.setFilter = function(prop, value) {
        $scope.filters[prop] = value;
    };

    apiService.get('/referrals/listall')
        .then(function(referrals) {
            return dateService.formatDatesArray(referrals, ['date_added']);
        })
        .then(function(data) {
            $scope.referalls = data;
        });

    $scope.filters = {};
});