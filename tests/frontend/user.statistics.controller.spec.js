describe('statisticsController', function() {
    var scope;
    var chartService;
    var createController;
    var notifyService;
    var apiService;

    //INCLUDE APP
    beforeEach(module('SU'));

    //INCLUDE APP DEPENDENCIES
    beforeEach(function() {
        module('ngRoute');
        module('angularCharts');
        module('ui.calendar');
    });

    beforeEach(inject(function($rootScope, $controller, _$location_, _notifyService_, _apiService_) {
        $location = _$location_;
        notifyService = _notifyService_;
        scope = $rootScope.$new();

        apiService = _apiService_;

        // MOCK A RETURNED PROMISE
        spyOn(apiService, 'get')
            .and.returnValue(new Promise(function(resolve) {
                return resolve([]);
            }));
        spyOn(apiService, 'post')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));

        spyOn(notifyService, 'success')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));

        createController = function() {
            return $controller('statisticsController', {
                '$scope': scope
            });
        };
    }));

    // DEFAULT PARAMS
    describe('default params', function() {
        it('are setup', function() {
            var controller = createController();

            expect(scope.signup_chart_config)
                .toBeDefined();
            expect(scope.signup_chart_data)
                .toBeDefined();
            expect(scope.severity_chart_config)
                .toBeDefined();
            expect(scope.severity_chart_data)
                .toBeDefined();
        });
    });

    describe('refreshUsers', function() {
        it('are setup', function() {
            var controller = createController();
            scope.refreshUsers();
            expect(apiService.get)
                .toHaveBeenCalled();

        });
    });
});