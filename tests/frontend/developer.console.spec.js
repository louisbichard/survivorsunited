describe('developerConsoleController', function() {

    var scope;
    var chartService;
    var createController;
    var notifyService;
    var apiService;
    var utilityService;

    //INCLUDE APP
    beforeEach(module('SU'));

    //INCLUDE APP DEPENDENCIES
    beforeEach(function() {
        module('ngRoute');
        module('angularCharts');
        module('ui.calendar');
    });

    beforeEach(inject(function(_$rootScope_, $controller, _$location_, _utilityService_, _apiService_, _notifyService_) {
        $location = _$location_;
        scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;

        notifyService = _notifyService_;
        apiService = _apiService_;
        utilityService = _utilityService_;

        // MOCK A RETURNED PROMISE
        spyOn(apiService, 'get')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));
        spyOn(apiService, 'post')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));

        spyOn(notifyService, 'error')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));

        spyOn(notifyService, 'success')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));

        createController = function() {
            return $controller('developerConsoleController', {
                '$scope': scope
            });
        };
    }));

    describe('runTest', function() {
        it('functions appropriately', function() {
            var controller = createController();
            scope.runTest('exampletype');
            spyOn(scope, 'addResponseToScope');
            expect(scope.loading.exampletype)
                .toBe(true);
            expect(apiService.get)
                .toHaveBeenCalled();
        });
    });

    describe('addResponseToScope', function() {
        it('functions appropriately', function() {
            var controller = createController();
            scope.addResponseToScope({}, 'type');
            expect(scope.results.type)
                .toEqual({});
            expect(scope.loading.type)
                .toBe(false);
        });
    });

    describe('addErrorsToScope', function() {
        it('functions appropriately', function() {
            var controller = createController();
            scope.addErrorsToScope({});
            expect(scope.errors_by.anonymous)
                .toBeDefined();
            expect(scope.errors_by.err)
                .toBeDefined();
            expect(scope.errors_by.location)
                .toBeDefined();
            expect(scope.error_list)
                .toBeDefined();
        });
    });

    describe('getErrors', function() {
        it('functions appropriately', function() {
            var controller = createController();
            spyOn(scope, 'addErrorsToScope');
            expect(apiService.get)
                .toHaveBeenCalled();
        });
    });

});