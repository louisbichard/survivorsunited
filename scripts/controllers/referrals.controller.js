SU.controller('referralsController', function($scope, apiService, notifyService, dateService) {

    $scope.filters = {};

    apiService.get('/referrals/listall')
        .then(function(referrals) {
            return dateService.formatDatesArray(referrals, ['date_added']);
        })
        .then(function(data) {
            $scope.referalls = data;
        });
});