describe('taskManagementController', function() {

    var scope;
    var chartService;
    var createController;
    var notifyService;
    var apiService;
    var utilityService;
    var dateService;

    //INCLUDE APP
    beforeEach(module('SU'));

    //INCLUDE APP DEPENDENCIES
    beforeEach(function() {
        module('ngRoute');
        module('angularCharts');
        module('ui.calendar');
    });

    beforeEach(inject(function($rootScope, $controller, _$location_, _utilityService_, _apiService_, _notifyService_, _dateService_) {
        $location = _$location_;
        scope = $rootScope.$new();
        notifyService = _notifyService_;
        dateService = _dateService_;


        apiService = _apiService_;
        utilityService = _utilityService_;

        // MOCK A RETURNED PROMISE
        spyOn(apiService, 'get').and.returnValue(new Promise(function(resolve) {
            return resolve();
        }));

        spyOn(apiService, 'post').and.returnValue(new Promise(function(resolve) {
            return resolve();
        }));

        // SPY ON NOTIFICATION SERVICE
        spyOn(notifyService, 'error');
        spyOn(notifyService, 'success');

        // SPY ON FORMATTING FUNCTION SO AS NOT TO THROW AN ERROR
        spyOn(dateService, 'formatDatesArray');

        createController = function() {
            return $controller('taskManagementController', {
                '$scope': scope
            });
        };
    }));

    describe('bootstrap', function() {
        it('functions', function() {
            var controller = createController();
            scope.bootstrap();
        });
    });


});