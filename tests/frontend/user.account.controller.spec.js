describe('accountController', function() {

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

    beforeEach(inject(function(_$rootScope_, $controller, _$location_, _utilityService_, _apiService_) {
        $location = _$location_;
        scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;

        apiService = _apiService_;
        utilityService = _utilityService_;

        // MOCK A RETURNED PROMISE
        spyOn(apiService, 'get').and.returnValue(new Promise(function(resolve) {
            return resolve({});
        }));
        spyOn(apiService, 'post').and.returnValue(new Promise(function(resolve) {
            return resolve();
        }));

        createController = function() {
            return $controller('accountController', {
                '$scope': scope
            });
        };
    }));

    describe('constants', function() {
        it('are setup', function() {
            var controller = createController();
            expect(scope.user_original).toBeDefined();
        });
    });

    describe('bootstrap', function() {
        it('runs', function() {
            var controller = createController();
            expect(scope.users).toBeUndefined();
            scope.bootstrap();
            expect(apiService.get).toHaveBeenCalled();
        });
    });

});