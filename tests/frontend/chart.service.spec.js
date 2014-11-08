describe('chartService', function() {

    var scope;
    var chartService;

    //INCLUDE APP
    beforeEach(module('SU'));

    //INCLUDE APP DEPENDENCIES
    beforeEach(function() {
        module('ngRoute');
        module('angularCharts');
        module('ui.calendar');
    });

    beforeEach(inject(function(_chartService_) {
        chartService = _chartService_;
    }));

    // FUNCTION: CURRENT VALUES 
    describe('current values', function() {
        it('throws Error if no parameter passed', function() {
            expect(chartService.currentValues).toThrow();
        });

        it('throws Error if incorrect incorrect type passed as parameter', function() {

            // PASS IN STRING
            expect(function() {
                return chartService.currentValues("");
            }).toThrow();

            // PASS IN OBJECT
            expect(function() {
                return chartService.currentValues({});
            }).toThrow();
        });

        it('Throws error if array parameters are incorrect values', function() {

            // PASS ARRAY OF STRINGS
            expect(function() {
                chartService.currentValues(["", ""]);
            }).toThrow();

        });

        it('Returns array of x values', function() {
            expect(chartService.currentValues(
                    [{
                        x: "November",
                        y: ""
                    }, {
                        x: "December",
                        y: ""
                    }]
                ))
                .toEqual(
                    ["November", "December"]
                );

        });
    });

    // FUNCTION: BLANK SERVICE
    describe('blank series', function() {

        it('throws Error if no parameter passed', function() {
            expect(chartService.blankSeries).toThrow();
        });

        it('Returns array', function() {
            expect(chartService.blankSeries(1)).toEqual(['']);
            expect(chartService.blankSeries(2)).toEqual(['', '']);
            expect(chartService.blankSeries(5)).toEqual(['', '', '', '', '']);
        });

    });


    // FUNCTION: userCreationDates
    describe('userCreationDates', function() {

        it('throws Error if no parameter passed', function() {
            expect(chartService.userCreationDates).toThrow();
        });

        it('throws Error if parameters are not objects', function() {
            expect(function() {
                chartService.userCreationDates(["", ""]);
            }).toThrow();
        });

        it('throws Error if parameters is not an array', function() {
            expect(function() {
                chartService.userCreationDates({});
            }).toThrow();
        });

        it('persists if no date is passed', function() {
            expect(chartService.userCreationDates([{
                    "date_created": "3rd December 2014",
                },
                // NO DATE IN PARAMETER
                {}
            ])).toEqual([{
                "x": "December 2014",
                "y": [1]
            }]);
        });

        it('creates object if correct parameters', function() {
            expect(chartService.userCreationDates([{
                "date_created": "3rd December 2014",
            }, {
                "date_created": "3rd November 2014"
            }])).toEqual([{
                "x": "December 2014",
                "y": [1]
            }, {
                "x": "November 2014",
                "y": [1]
            }]);
        });

        it('creates and counts multiple instances of the same month', function() {
            expect(chartService.userCreationDates([{
                "date_created": "3rd December 2014",
            }, {
                "date_created": "3rd December 2014"
            }])).toEqual([{
                "x": "December 2014",
                "y": [2]
            }]);
        });
    });


    // FUNCTION: userSeverityGrade
    describe('userSeverityGrade', function() {

        it('throws Error if no parameter passed', function() {
            expect(chartService.userSeverityGrade).toThrow();
        });

        it('throws Error if parameter is not array', function() {

            expect(function() {
                chartService.userSeverityGrade({});
            }).toThrow();

            expect(function() {
                chartService.userSeverityGrade("");
            }).toThrow();

        });

        it('creates and counts multiple instances of the same month', function() {
            expect(chartService.userSeverityGrade([{
                "severity_grade": "High",
            }, {
                "severity_grade": "Low"
            }])).toEqual([{
                "x": "Low",
                "y": [1]
            }, {
                "x": "High",
                "y": [1]
            }]);
        });

        it('persists if user has no severity grade, or one that doesn\'t exist', function() {
            expect(chartService.userSeverityGrade([{
                severity_grade: "Medium"
            }, {
                "severity_grade": "Incorrect",
            }, {}])).toEqual([{
                "x": "Medium",
                "y": [1]
            }]);
        });
    });

});