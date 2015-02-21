SU.service("referralsService", function(apiService, dateService) {
    var referrals_route = '/referrals/listall';

    var totalByStatus = function(results) {
        return _.chain(results)
            .reduce(function(prev, curr) {
                if (curr.is_open) prev[0] ++;
                else prev[1] ++;
                return prev;
            }, [0, 0])
            .value();
    };

    var velocity = function(results, time_unit) {
        var total_velocity = _.chain(results)
            .map(function(curr) {
                var a = moment(curr.last_updated);
                var b = moment(curr.date_added);
                return a.diff(b, time_unit);
            })
            .reduce(function(prev, curr, orig, index) {
                return prev + curr;
            }, 0)
            .value();

        return Math.round(total_velocity / results.length);
    };

    var byTime = function(data) {
        var referrals_by_month = _.chain(data)
            .sortBy(function(curr){
                return moment(curr.date_added).unix();
            })
            .countBy(function(curr) {
                return moment(curr.date_added).format('MM/YYYY');
            })
            .value();

        return {
            'months': _.keys(referrals_by_month),
            'values': [_.values(referrals_by_month)]
        };
    };

    this.get = {
        'all': function() {
            return apiService.get(referrals_route)
                .then(function(referrals) {
                    return dateService.formatDatesArray(referrals, ['date_added', 'last_updated']);
                });
        },
        'stats': function(config) {
            return apiService.get(referrals_route).then(function(data) {
                return {
                    'total': totalByStatus(data),
                    'velocity': velocity(data, config.velocity_value),
                    'time': byTime(data)
                };
            });
        }
    };
});