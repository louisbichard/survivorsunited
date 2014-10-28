SU.service("chartService", function($http) {

    //TODO: UNIT TEST THIS!!!
    //
    //

    // CHART UTILITY FUNCTIONS
    var currentValues = function(output) {
        return _.reduce(output, function(prev, curr) {
            prev.push(curr.x);
            return prev;
        }, []);
    };

    this.blankSeries = function() {
        // CREATE SERIES (JUST AN ARRAY OF EMPTY STRINGS)
        var n = length;
        var series = Array(n).join(".").split(".");

        return series;
    };

    // CHART API's
    this.userCreationDates = function(users) {

        var chart_data = _.reduce(users, function(prev, curr) {
            var date_created = curr.date_created.split(' ')[1];

            var index = $.inArray(date_created, currentValues(prev));
            if (index > -1) {
                prev[index].y[0] ++;
            } else {
                prev.push({
                    x: date_created,
                    y: [1]
                });
            }
            return prev;
        }, []);

        return chart_data;
    };

    this.userSeverityGrade = function(users) {
        return _.reduce(users, function(prev, user) {
            if (user.severity_grade === "Low") {
                prev[0].y[0]++;
            }
            if (user.severity_grade === "Medium") {
                prev[1].y[0]++;
            }
            if (user.severity_grade === "High") {
                prev[2].y[0]++;
            }

            return prev;
        }, [{
            "x": "Low",
            "y": [0]
        }, {
            "x": "Medium",
            "y": [0]
        }, {
            "x": "High",
            "y": [0]
        }]);
    };
});