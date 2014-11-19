describe('main controller', function() {

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
            return $controller('mainController', {
                '$scope': scope
            });
        };
    }));

    describe('updates sidebar', function() {
        it('are setup', function() {
            var controller = createController();
            $location.path('/changed');
            $rootScope.$apply();
            $rootScope.$broadcast('$locationChangeSuccess', {});
            expect(scope.current_location).toBe('changed');
        });
    });

    describe('toggles sidebar', function() {
        it('are setup', function() {
            var controller = createController();
            expect(scope.toggle).toBeUndefined();
            scope.toggleSidebar();
            expect(scope.toggle).toBe(true);
            scope.toggleSidebar();
            expect(scope.toggle).toBe(false);
        });
    });

    describe('logs out', function() {
        it('are setup', function() {
            var controller = createController();

            // ENSURE THAT IT'S SETUP CORRECTLY
            expect(scope.anonymous_user).toBeUndefined();

            scope.successfullLogout();
            expect(scope.anonymous_user).toBe(true);
        });
    });


    describe('logs in', function() {
        it('are setup', function() {
            var controller = createController();

            scope.successfullLogin();
            expect(scope.anonymous_user).toBe(false);
        });
    });

    describe('bootstrapDashboard', function() {
        it('runs', function() {
            var controller = createController();

            scope.bootstrapDashboard();
            expect(apiService.get).toHaveBeenCalled();

            //TODO:
            //spyOn(scope, 'successfullLogin');
            //expect(scope.successfullLogin).toHaveBeenCalled();
        });
    });

    describe('mainLogOut', function() {
        it('runs', function() {
            var controller = createController();

            scope.mainLogOut();
            expect(apiService.get).toHaveBeenCalled();

            //TODO:
            //spyOn(scope, 'successfullLogin');
            //expect(scope.successfullLogin).toHaveBeenCalled();
        });
    });

    describe('mainLogin', function() {
        it('runs', function() {
            var controller = createController();

            scope.mainLogin();
            expect(apiService.get).toHaveBeenCalled();

            //TODO:
            //spyOn(scope, 'successfullLogin');
            //expect(scope.successfullLogin).toHaveBeenCalled();
        });
    });

});