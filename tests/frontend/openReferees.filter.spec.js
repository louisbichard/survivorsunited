describe('openReferrees', function() {

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
        openReferrees = $filter('openReferrees');
    }));

    describe('errors', function() {
        it('if no filters passed', function() {
            expect(function() {
                openReferrees([], []);
            }).toThrow();
        });

    });

});