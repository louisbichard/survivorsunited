describe('internalFilter', function() {

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
        internalFilter = $filter('internalFilter');
    }));

    describe('errors', function() {
        it('if no filters passed', function() {
            expect(function() {
                internalFilter([], []);
            }).toThrow();
        });

        it('filter has no value passed', function() {
            expect(function() {
                internalFilter([], [{
                    name: "internalFilter"
                }]);
            }).toThrow();
        });

    });

    describe('returns correct values', function() {
        it('for internal users', function() {
            expect(
                    internalFilter([{
                        role: "Admin"
                    }], [{
                        name: "internal",
                        value: "Internal"
                    }])
                )
                .toEqual([{
                    role: "Admin"
                }]);
        });
    });

    describe('returns empty array when requesting internal when there are none', function() {
        it('for internal users', function() {
            expect(
                    internalFilter([{
                        role: "Basic"
                    }], [{
                        name: "internal",
                        value: "Internal"
                    }])
                )
                .toEqual([]);
        });
    });

    describe('returns empty array when requesting external when there are none', function() {
        it('for internal users', function() {
            expect(
                    internalFilter([{
                        role: "Mentor"
                    }], [{
                        name: "internal",
                        value: "External"
                    }])
                )
                .toEqual([]);
        });
    });

    describe('returns all', function() {
        it('when all requested', function() {
            expect(
                    internalFilter([{
                        role: "Mentor"
                    }, {
                        role: "Mentor"
                    }], [{
                        name: "internal",
                        value: "All"
                    }])
                )
                .toEqual([{
                    role: "Mentor"
                }, {
                    role: "Mentor"
                }]);
        });
    });

});