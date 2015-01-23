SU.filter('openReferrees', function() {
    return function(input, filters) {
        return _.filter(input, function(val) {
            return true;
            //return (filters.is_open && val.is_open) ? true : false;
        });

    };
});