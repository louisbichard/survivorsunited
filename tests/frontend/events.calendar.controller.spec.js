describe('eventCalendarController', function() {

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

    beforeEach(inject(function($rootScope, $controller, _$location_, _utilityService_, _apiService_, _notifyService_) {
        $location = _$location_;
        scope = $rootScope.$new();
        notifyService = _notifyService_;

        apiService = _apiService_;
        utilityService = _utilityService_;

        spyOn(notifyService, 'success');

        spyOn(apiService, 'get')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));

        scope.calendar = {
            fullCalendar: function() {}
        };

        createController = function() {
            return $controller('eventCalendarController', {
                '$scope': scope
            });
        };
    }));

    describe('default params', function() {
        it('are setup', function() {
            var controller = createController();
            expect(scope.events)
                .toBeDefined();
            expect(scope.uiConfig)
                .toBeDefined();
            expect(scope.eventSources)
                .toBeDefined();
        });
    });

    describe('formatDates', function() {
        it('runs', function() {
            var controller = createController();
            scope.formatDates({
                start: 1416684553715,
                end: 1416684553715,
                title: "some arbritrary nonsense"
            });
            scope.formatDates({
                title: "just a title"
            });
            scope.formatDates();
        });
    });

    describe('notifyOfRefresh', function() {
        it('are setup', function() {
            var controller = createController();
            scope.notifyOfRefresh(true);
            expect(notifyService.success)
                .toHaveBeenCalled();
        });
    });

    describe('refreshEvents', function() {
        it('are setup', function() {
            var controller = createController();
            spyOn(scope, 'setupScope');
            spyOn(scope, 'notifyOfRefresh');
            scope.refreshEvents();
            expect(apiService.get)
                .toHaveBeenCalled();
        });
    });
});