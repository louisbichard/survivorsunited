SU.filter('internalFilter', function() {
    return function(input, filters) {

        // IF INTERNAL IS CHECKED
        if (_.findWhere(filters, {
                name: "internal"
            }).checked) {
            input = _.filter(input, function(user) {
                return (user.role === "Mentor" || user.role === "Admin");
            });
        }

        // iF EXTERNAL
        if (_.findWhere(filters, {
                name: "external"
            }).checked) {
            input = _.filter(input, function(user) {
                return (user.role === "Basic");
            });
        }

        return input;
    };
})

.filter('externalFilter', function() {
    return function(input, filters) {

        // IF EXTERNAL
        if (_.findWhere(filters, {
                name: "external"
            }).checked) {
            input = _.filter(input, function(user) {
                return (user.role === "Basic");
            });
        }

        return input;
    };
});

/*.filter('severityFilter', function() {
    return function(input, filters) {

        // IF HIGH SEVERITY
        if (_.findWhere(filters, {
                name: "high_severity"
            }).checked) {
            input = _.filter(input, function(user) {
                return (user.severity_grade === "High");
            });
        }

        return input;
    };
});

.filter('noAssignedMentor', function() {
    return function(input, filters) {

        // IF NO ASSIGNED MENTOR
        if (_.findWhere(filters, {
                name: "no_assigned_mentor"
            }).checked) {
            input = _.filter(input, function(user) {
                return (user.mentor === false);
            });
        }

        return input;
    };
});*/