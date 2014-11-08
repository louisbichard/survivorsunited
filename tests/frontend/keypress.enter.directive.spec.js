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
        
        scope.pressEnter = function() {
            scope.test = 'has value';
        };

        element ='<input ng-enter=\'pressEnter()\'></input>';
        element = $compile(element)(scope);
        scope.$digest();
    }));

    // DEFAULT PARAMS
    describe('element', function() {
        it('defined', function() {
            TEST.utilities.triggerKeyDown(element, 13);
            expect(scope.test).toEqual('has value');
        });
    });

    describe('element', function() {
        it('does nothing on other keypresses', function() {
            TEST.utilities.triggerKeyDown(element, 14);
            expect(scope.test).toBeUndefined();
        });
    });


});