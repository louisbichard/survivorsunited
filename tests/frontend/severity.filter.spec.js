describe('severityFilter', function() {

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

    beforeEach(inject(function(_$filter_) {
        $filter = _$filter_;
        severityFilter = $filter('severityFilter');
    }));

    describe('errors', function() {
        it('if no filters passed', function() {
            expect(function() {
                severityFilter([], []);
            }).toThrow();
        });

        it('filter has no value passed', function() {
            expect(function() {
                severityFilter([], [{
                    name: "severityFilter"
                }]);
            }).toThrow();
        });

    });

    describe('returns correct values', function() {
        it('for severity users', function() {
            expect(
                    severityFilter([{
                        severity_grade: "High"
                    }], [{
                        name: "severity",
                        value: "High"
                    }])
                )
                .toEqual([{
                    severity_grade: "High"
                }]);
        });
    });

    describe('returns empty array when requesting Low severity users when there are none', function() {
        it('for severity users', function() {
            expect(
                    severityFilter([{
                        severity_grade: "High"
                    }], [{
                        name: "severity",
                        value: "Low"
                    }])
                )
                .toEqual([]);
        });
    });

    describe('returns empty array when requesting Low severity users when there are none', function() {
        it('for severity users', function() {
            expect(
                    severityFilter([{
                        severity_grade: "High"
                    }, {
                        severity_grade: "Low"
                    }, {
                        severity_grade: "Medium"
                    }], [{
                        name: "severity",
                        value: "Medium"
                    }])
                )
                .toEqual([{
                    severity_grade: "Medium"
                }]);
        });
    });

    describe('returns empty array when requesting low severity when there are none', function() {
        it('for severity users', function() {
            expect(
                    severityFilter([{
                        severity_grade: "High"
                    }], [{
                        name: "severity",
                        value: "Low"
                    }])
                )
                .toEqual([]);
        });
    });

    describe('returns all', function() {
        it('when all requested', function() {
            expect(
                    severityFilter([{
                        severity_grade: "High"
                    }, {
                        severity_grade: "High"
                    }], [{
                        name: "severity",
                        value: "All"
                    }])
                )
                .toEqual([{
                    severity_grade: "High"
                }, {
                    severity_grade: "High"
                }]);
        });
    });

});