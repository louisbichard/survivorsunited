describe('dashboardController', function() {

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
        spyOn(apiService, 'get')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));
        spyOn(apiService, 'post')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));

        createController = function() {
            return $controller('dashboardController', {
                '$scope': scope
            });
        };
    }));

    describe('setupScope', function() {
        it('functions', function() {
            var controller = createController();
            var tasks = [{}];
            spyOn(scope, 'setupStatistics');
            scope.setupScope(tasks);
            expect(scope.tasks)
                .toEqual(tasks);

            expect(scope.setupStatistics)
                .toHaveBeenCalled();
        });
    });

    describe('setupStatistics', function() {
        it('functions', function() {
            var controller = createController();
            scope.tasks = [{
                status: "open"
            }];

            scope.setupStatistics();

            expect(scope.pending_tasks)
                .toEqual(1);

            expect(scope.complete_tasks)
                .toEqual(0);
        });
    });

    describe('countStatus', function() {
        it('functions', function() {
            var controller = createController();

            var tasks = [{
                status: 'open'
            }, {
                status: 'closed'
            }, {
                status: 'closed'
            }];

            expect(scope.countStatus(tasks, 'closed'))
                .toEqual(2);

            expect(scope.countStatus(tasks, 'open'))
                .toEqual(1);

            expect(scope.countStatus(tasks, 'something_non_existant'))
                .toEqual(0);
        });
    });

    describe('bootstrap', function() {
        it('functions', function() {
            var controller = createController();

            spyOn(scope, 'setupScope');

            expect(apiService.get)
                .toHaveBeenCalled();

        });
    });

    describe('updateScope', function() {
        it('closes the status of a task', function() {
            var controller = createController();

            spyOn(scope, 'setupStatistics');

            scope.tasks = [{
                _id: 'test',
                status: 'open'
            }, {
                _id: 'another example id',
                status: 'open'
            }];

            scope.updateScope('test', 'closed');

            expect(scope.tasks)
                .toEqual([{
                    _id: 'test',
                    status: 'closed'
                }, {
                    _id: 'another example id',
                    status: 'open'
                }]);

            expect(scope.setupStatistics)
                .toHaveBeenCalled();

        });

        it('errors with false id', function() {
            var controller = createController();
            scope.tasks = [{}];

            expect(function() {
                    scope.updateScope('id', 'closed');
                })
                .toThrow();

        });
    });

    describe('updateTask', function() {
        it('throws errors with incorrect parameters', function() {
            var controller = createController();
            expect(function() {
                    scope.updateTask(null, null);
                })
                .toThrow();

            expect(function() {
                    scope.updateTask(null, 'open');
                })
                .toThrow();

            expect(function() {
                    scope.updateTask('id', null);
                })
                .toThrow();
        });
        it('functions properly', function() {
            var controller = createController();
            spyOn(scope, 'updateScope');
            scope.updateTask('id', 'open');
            expect(apiService.post)
                .toHaveBeenCalled();
        });
    });
});