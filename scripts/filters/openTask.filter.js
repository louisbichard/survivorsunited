SU.filter('openTaskFilter', function() {
    return function(input, filters) {

        var filter = _.findWhere(filters, {
            name: "openTask"
        });

        if (!filter || !filter.value) {
            throw new Error('No filter passed to internal filter');
        }

        filter = filter.value;

        return _.filter(input, function(task) {
            if (filter && filter === "open") {
                return (task.status === "open");
            }
            else if (filter && filter === "closed") {
                return (task.status === "closed");
            }
            else {
                return task;
            }
        });

    };
});