SU.controller('referralsController', function($scope, apiService, notifyService, dateService, referralsService, utilityService) {

    var prepareDates = function(object){

    };

    $scope.velocity_config = {
        "start":"2015-02-04T00:00:00.000Z",
        "end":"2015-02-04T00:00:00.000Z"
    };

    $scope.format = utilityService.date_format;

    $scope.open = function(scope_prop, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope[scope_prop] = !$scope[scope_prop];
    };

    $scope.filters = {};

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
            // TODO: MAKE THIS DATE DEPENDENT FOR STATS IN REFERRALS SERVICE
            'stats': referralsService.get.stats(prepareDates($scope.velocity_config)),
            'all': referralsService.get.all()
        })
        .then(function(data) {
            $scope.referrals = data.all;
            $scope.referral_stats = data.stats;
        });

        if (notify) notifyService.success('Updated referral status');
    };

    $scope.$watch('velocity_config', function(){
        $scope.init();
    }, true);


    $scope.init();
});