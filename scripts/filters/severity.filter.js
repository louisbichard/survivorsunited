SU.filter('severityFilter', function() {
    return function(input, filters) {

        var filter = _.findWhere(filters, {
            name: "severity"
        });

        if (!filter || !filter.value) {
            throw new Error('No filter passed to Severity filter');
        }

        filter = filter.value;

        return _.filter(input, function(user) {
            if (filter === "Low") {
                return (user.severity_grade === "Low");
            } else if (filter === "Medium") {
                return (user.severity_grade === "Medium");
            } else if (filter === "High") {
                return (user.severity_grade === "High");
            } else {
                return user;
            }
        });
    };
});