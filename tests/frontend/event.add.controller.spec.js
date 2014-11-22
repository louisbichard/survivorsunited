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

    beforeEach(inject(function($rootScope, $controller, _$location_, _utilityService_, _apiService_, _notifyService_) {
        $location = _$location_;
        scope = $rootScope.$new();
        notifyService = _notifyService_;

        apiService = _apiService_;
        utilityService = _utilityService_;

        createController = function() {
            return $controller('addEventController', {
                '$scope': scope
            });
        };
    }));

    describe('default params', function() {
        it('are setup', function() {
            var controller = createController();
            expect(scope.format)
                .toBeDefined();
            expect(scope.dateOptions)
                .toBeDefined();
        });
    });

    describe('addEvent function', function() {
        it('converts the scope dates', function() {
            var controller = createController();
            scope.add_event = {};
            spyOn(utilityService, 'convertDatesToTimeStamps');
            spyOn(apiService, 'post');
            scope.addEvent();
            expect(utilityService.convertDatesToTimeStamps)
                .toHaveBeenCalled();

            expect(apiService.post)
                .toHaveBeenCalled();
        });
    });

    describe('clearEvent', function() {
        it('wipes the scope variable', function() {
            var controller = createController();

            scope.add_event = {
                some_key: "some arbitrary nonsense"
            };

            spyOn(notifyService, 'success');

            scope.clearEvent('some_property');

            expect(scope.add_event)
                .toEqual({});

            expect(notifyService.success)
                .toHaveBeenCalled();
        });
    });

    describe('open', function() {
        it('sets the prop and prevents event from normal operation', function() {
            var controller = createController();

            $event = {
                preventDefault: function() {},
                stopPropagation: function() {}
            };

            spyOn($event, 'preventDefault');
            spyOn($event, 'stopPropagation');

            scope.open('some_property', $event);

            expect($event.preventDefault)
                .toHaveBeenCalled();

            expect($event.stopPropagation)
                .toHaveBeenCalled();

            expect(scope.some_property)
                .toBe(true);

            scope.open('some_property', $event);

            expect(scope.some_property)
                .toBe(false);
        });
    });

});