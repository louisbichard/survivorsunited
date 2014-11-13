describe('userDetails controller', function() {

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

    beforeEach(inject(function($rootScope, $controller, _$location_, _utilityService_, _apiService_) {
        $location = _$location_;
        scope = $rootScope.$new();

        apiService = _apiService_;
        utilityService = _utilityService_;

        createController = function() {
            return $controller('addEventController', {
                '$scope': scope
            });
        };
    }));

    // DEFAULT PARAMS
    describe('default params', function() {
        it('are setup', function() {
            var controller = createController();
            expect(scope.format).toBeDefined();
            expect(scope.dateOptions).toBeDefined();
        });
    });

    // CLEAR FILTER
    describe('addEvent function', function() {
        it('converts the scope dates', function() {
            var controller = createController();
            scope.add_event = {};
            spyOn(utilityService, 'convertDatesToTimeStamps');
            spyOn(apiService, 'post');
            scope.addEvent();
            expect(utilityService.convertDatesToTimeStamps).toHaveBeenCalled();
            expect(apiService.post).toHaveBeenCalled();
        });
    });

});