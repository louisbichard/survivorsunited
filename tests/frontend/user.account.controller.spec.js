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

    beforeEach(inject(function(_$rootScope_, $controller, _$location_, _utilityService_, _apiService_, _notifyService_) {
        notifyService = _notifyService_;
        $location = _$location_;
        scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;

        apiService = _apiService_;
        utilityService = _utilityService_;

        // MOCK A RETURNED PROMISE
        spyOn(apiService, 'get')
            .and.returnValue(new Promise(function(resolve) {
                return resolve({});
            }));
        spyOn(apiService, 'post')
            .and.returnValue(new Promise(function(resolve) {
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
            expect(scope.user_original)
                .toBeDefined();
        });
    });

    describe('bootstrap', function() {
        it('runs', function() {
            var controller = createController();
            expect(scope.users)
                .toBeUndefined();
            scope.bootstrap();
            expect(apiService.get)
                .toHaveBeenCalled();
        });
    });

    describe('userFieldChanged', function() {
        it('runs', function() {
            var controller = createController();
            scope.user = {
                _id: "asdasdas"
            };
            scope.userFieldChanged();
            expect(apiService.get)
                .toHaveBeenCalled();
        });
    });

    describe('updateContact', function() {
        it('calls error when no user_id', function() {
            var controller = createController();
            expect(function() {
                    scope.updateContact();
                })
                .toThrow();
        });
        it('calls warning when no updates found', function() {
            var controller = createController();
            spyOn(notifyService, 'warning');
            scope.update_params = {
                user_id: 'adad'
            };
            scope.user_id = 'some value';
            scope.updateContact();
            expect(notifyService.warning)
                .toHaveBeenCalled();
        });
        it('calls update when there are updates found', function() {
            var controller = createController();
            spyOn(notifyService, 'warning');
            scope.update_params = {
                user_id: 'adad',
                some_data: 'adadad'
            };
            scope.user_id = 'some value';
            scope.updateContact();
            expect(apiService.post)
                .toHaveBeenCalled();
        });
    });

});