SU.filter('assignedMentorFilter', function() {
    return function(input, filters) {

        var filter = _.findWhere(filters, {
            name: "assigned_mentor"
        });

        if (!filter || !filter.value) {
            throw new Error('No filter passed to assigned mentor filter');
        }

        filter = filter.value;

        return _.filter(input, function(user) {
            if (filter === "yes") {
                return user.mentor;
            } else if (filter === "no") {
                return !user.mentor;
            } else {
                return user;
            }
        });
    };
});