SU.controller('referralsController', function($scope, apiService, notifyService, dateService, referralsService) {

    $scope.filters = {};
    $scope.config = {
        velocity_value: 'minutes'
    };

    $scope.referral_stats = {
        total: []
    };

    $scope.resetScope = function() {
        $scope.filters = {};
        notifyService.info('Cleared filters');
    };

    $scope.setFilter = function(prop, value) {
        $scope.filters[prop] = value;
    };

    $scope.updateReferral = function(details) {
        apiService.post('/referrals/update', {
                id: details._id,
                is_open: String(!details.is_open)
            })
            .then(_.partial($scope.init, true));
    };

    $scope.init = function(notify) {
        Promise.props({
            'stats': referralsService.get.stats($scope.config),
            'all': referralsService.get.all()
        })
        .then(function(data) {
            $scope.referrals = data.all;
            $scope.referral_stats = data.stats;
        });

        if (notify) notifyService.success('Updated referral status');
    };

    $scope.$watch('config.velocity_value', function(){
        $scope.init();
    });


    $scope.init();
});