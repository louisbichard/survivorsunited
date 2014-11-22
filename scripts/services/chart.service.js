SU.service("chartService", function($http) {

    var that = this;

    // CHART UTILITY FUNCTION
    this.currentValues = function(output) {

        //THROW ERROR IF ABSENCE OF PARAM OR WRONG FORMAT
        if (!output || !_.isArray(output)) {
            throw new Error('output parameter not passed or incorrect format in currentValues function in chartService');
        }

        return _.reduce(output, function(prev, curr) {

            //ENSURE THE VALUE IS AN OBJECT
            if (!_.isObject(curr)) {
                throw new Error('output array passed to currentValues can only contain an array of objects, in chartService');
            }

            prev.push(curr.x);
            return prev;
        }, []);
    };

    this.blankSeries = function(length) {

        // CREATE SERIES (JUST AN ARRAY OF EMPTY STRINGS)
        if (!_.isNumber(length)) {
            throw new Error('No length passed to blankSeries function in chartService');
        }

        // MAKE ARRAY BETWEEN 0 AND PARAMETER VALUE
        var range = _.range(0, length);

        // TURN ALL VALUES INTO EMPTY STRINGS
        return _.map(range, function() {
            return "";
        });

    };

    /**
     * Takes an array of objects, of format
     * @param  {Array} users - [{date_created:"10th December 2010"}] where date created is a space delimited date string
     * @return {Array} - returns an array of unique months as x, and for each a count as Y [{x: "December", y: [0]}]
     */
    this.userCreationDates = function(users) {

        if (!users || !_.isArray(users)) {
            throw new Error('No parameter passed to userCreationDates in chartService');
        }

        var chart_data = _.reduce(users, function(prev, curr) {
            var date_created;

            if (!_.isObject(curr)) {
                throw new Error('All values passed as parameter must be objects userCreationDates in chartService');
            }

            if (curr.date_created) {
                date_created = curr.date_created.split(' ');
                date_created = date_created[1] + ' ' + date_created[2];
            }

            // CHECK IF THE MONTH IS STORED, ADD NEW OBJECT IF NOT FOUND, ELSE INCREMENT Y VALUE
            if (date_created) {
                var index = $.inArray(date_created, that.currentValues(prev));
                if (index > -1) {
                    prev[index].y[0] ++;
                }
                else {
                    prev.push({
                        x: date_created,
                        y: [1]
                    });
                }
            }

            return prev;
        }, []);

        return chart_data;
    };

    this.userSeverityGrade = function(users) {

        if (!users || !_.isArray(users)) {
            throw new Error('Must pass a parameter to userSeverityGrade function in chartService');
        }

        var chart_data = _.reduce(users, function(prev, user) {
            if (user.severity_grade === "Low") {
                prev[0].y[0] ++;
            }
            if (user.severity_grade === "Medium") {
                prev[1].y[0] ++;
            }
            if (user.severity_grade === "High") {
                prev[2].y[0] ++;
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

        // REMOVE ALL ZERO USERS
        chart_data = _.filter(chart_data, function(severity_grade) {
            return (severity_grade.y > 0);
        });

        return chart_data;

    };
});