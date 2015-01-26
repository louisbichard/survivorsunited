SU.filter('openReferrees', function() {
    return function(input, filters) {
        if (!_.isPlainObject(filters)) {
            throw new Error('Filter format parameters incorrect');
        }

        return _.filter(input, function(val) {
            return !_.isEmpty(filters) ? filters.is_open === val.is_open : true;
        });
    };
});