describe('keyPress directive', function() {

    var scope;
    var chartService;
    var createController;
    var element;

    //INCLUDE APP
    beforeEach(module('SU'));

    //INCLUDE APP DEPENDENCIES
    beforeEach(function() {
        module('ngRoute');
        module('angularCharts');
        module('ui.calendar');
    });

    beforeEach(inject(function($rootScope, $controller, $compile) {
        scope = $rootScope.$new();

        element = '<spinner></spinner>';
        element = $compile(element)(scope);
        scope.$digest();
    }));

    // DEFAULT PARAMS
    describe('element', function() {
        it('iscreated', function() {
            expect(element).toBeDefined();
            expect(element.find('img')).toBeDefined();
        });
    });
});