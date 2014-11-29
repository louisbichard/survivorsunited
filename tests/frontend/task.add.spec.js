describe('addTaskController', function() {

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
        $location = _$location_;
        scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;

        notifyService = _notifyService_;
        apiService = _apiService_;
        utilityService = _utilityService_;

        // MOCK A RETURNED PROMISE
        spyOn(apiService, 'get')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));
        spyOn(apiService, 'post')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));

        spyOn(notifyService, 'error')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));

        spyOn(notifyService, 'success')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));

        createController = function() {
            return $controller('addTaskController', {
                '$scope': scope
            });
        };
    }));

    describe('clearTask', function() {
        it('functions appropriately', function() {
            var controller = createController();
            scope.add_task = {
                data: 'example'
            };
            scope.clearTask();
            expect(scope.add_task)
                .toEqual({});
            expect(notifyService.success)
                .toHaveBeenCalled();
        });
    });

    describe('assignToScope', function() {
        it('works', function() {
            var controller = createController();
            scope.add_task = {
                title: 'something',
                description: 'something else',
                assignee: 'someone'
            };
            scope.addTask();
            expect(apiService.post)
                .toHaveBeenCalled();
        });
    });

    describe('bootstrap', function() {
        it('gets data', function() {
            var controller = createController();
            scope.bootstrap();
            expect(apiService.get)
                .toHaveBeenCalled();
        });
    });

    describe('add task', function() {
        it('rejects if no task', function() {
            var controller = createController();
            scope.add_task = {};
            scope.addTask();
            expect(notifyService.error)
                .toHaveBeenCalled();
        });
        it('works', function() {
            var controller = createController();
            scope.add_task = {
                title: 'something',
                description: 'something else',
                assignee: 'someone'
            };
            scope.addTask();
            expect(apiService.post)
                .toHaveBeenCalled();
        });
    });

});