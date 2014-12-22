describe('mentorController', function() {

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
            return resolve();
        }));
        spyOn(apiService, 'post').and.returnValue(new Promise(function(resolve) {
            return resolve();
        }));

        createController = function() {
            return $controller('mentorController', {
                '$scope': scope
            });
        };
    }));

    describe('gets mentor api data', function() {
        it('are setup', function() {
            var controller = createController();
            expect(apiService.get).toHaveBeenCalled();
        });
    });

    describe('assignPropToScope', function() {
        it('assigns prop', function() {
            var controller = createController();
            expect(scope.mentor)
                .toBe(undefined);
            scope.assignPropToScope('mentor', {});

            expect(scope.mentor)
                .toEqual({});
        });
    });

    describe('assignToScope', function() {
        it('assigns prop', function() {
            var controller = createController();

            spyOn(scope, 'assignPropToScope');

            scope.assignToScope({});

            expect(scope.assignPropToScope)
                .toHaveBeenCalled();
        });
    });

});
