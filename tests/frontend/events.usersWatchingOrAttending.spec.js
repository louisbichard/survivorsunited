describe('usersWatchingEventController', function() {

    var scope;
    var chartService;
    var createController;
    var notifyService;
    var apiService;
    var utilityService;
    var $routeParams;

    //INCLUDE APP
    beforeEach(module('SU'));

    //INCLUDE APP DEPENDENCIES
    beforeEach(function() {
        module('ngRoute');
        module('angularCharts');
        module('ui.calendar');
    });

    beforeEach(inject(function($rootScope, $controller, _$location_, _utilityService_, _apiService_, _$routeParams_) {
        $location = _$location_;
        scope = $rootScope.$new();
        $routeParams = _$routeParams_;

        apiService = _apiService_;
        utilityService = _utilityService_;

        // MOCK A RETURNED PROMISE
        spyOn(apiService, 'get').and.returnValue(new Promise(function(resolve) {
            return resolve();
        }));

        createController = function(routeParams) {
            routeParams = routeParams || {};
            return $controller('usersWatchingEventController', {
                '$scope': scope,
                '$routeParams': routeParams
            });
        };
    }));

    describe('gets users', function() {
        it('throws error if event id or type not specified', function() {
            var controller = createController();
            expect(scope.error_message).toBeDefined();
        });

        it('doesnt throw error if event id or type present', function() {
            var controller = createController({
                id: 'sdfsdf',
                type: 'attending',
            });
            expect(scope.error_message).toBeUndefined();
            expect(apiService.get).toHaveBeenCalled();
        });
    });

    describe('assignResultToUsers', function() {
        it('is successfully', function() {
            var controller = createController({
                id: 'sdfsdf',
                type: 'attending',
            });
            expect(scope.users).toBeUndefined();
            scope.assignResultToUsers({test: "test"});
            expect(scope.users).toEqual({test: "test"});
        });
    });

});