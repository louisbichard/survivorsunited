SU.filter('internalFilter', function() {
    return function(input, filters) {

        var filter = _.findWhere(filters, {
            name: "internal"
        });

        if (!filter || !filter.value) {
            throw new Error('No filter passed to internal filter');
        }

        filter = filter.value;

        return _.filter(input, function(user) {
            if (filter && filter === "Internal") {
                return (user.role === "Mentor" || user.role === "Admin");
            } else if (filter && filter === "External") {
                return (user.role === "Basic");
            } else {
                return user;
            }
        });

    };
});