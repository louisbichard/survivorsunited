describe('upcomingWatchedSubscribedEventsController', function() {
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

        spyOn(apiService, 'get')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));

        spyOn(apiService, 'post')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));

        createWrongPathController = function() {
            return $controller('upcomingWatchedSubscribedEventsController', {
                '$scope': scope
            });
        };

        createWatcherController = function() {
            $controller('upcomingWatchedSubscribedEventsController', {
                '$scope': scope,
                '$location': {
                    $$path: '/watched_events'
                }
            });
        };

        createUpcomingController = function() {
            $controller('upcomingWatchedSubscribedEventsController', {
                '$scope': scope,
                '$location': {
                    $$path: '/upcoming_events'
                }
            });
        };
    }));

    describe('Upcoming events path', function() {
        it('are setup', function() {
            var controller = createUpcomingController();
            expect(scope.title)
                .toBe('Upcoming');
        });
    });

    describe('Watched path', function() {
        it('are setup', function() {
            var controller = createWatcherController();
            expect(scope.title)
                .toBe('Watched');
        });
    });

    describe('Incorrect path', function() {
        it('throws', function() {
            expect(function() {
                    createWrongPathController();
                })
                .toThrow();
        });
    });

    describe('Bootstrap', function() {
        it('are setup', function() {
            var controller = createWatcherController();
            expect(apiService.get)
                .toHaveBeenCalled();
        });
    });

    describe('formatDates', function() {
        it('are setup', function() {
            var controller = createWatcherController();
            scope.formatDates([{
                start: 1416482677287
            }]);

            expect(scope.events)
                .toEqual([{
                    start: "4th, November, 2014"
                }]);

        });
    });

    describe('watchOrAttend', function() {
        it('to throw with no parameters', function() {
            var controller = createWatcherController();
            expect(function() {
                    scope.watchOrAttend();
                })
                .toThrow();
        });

        it('to throw one parameter', function() {
            var controller = createWatcherController();
            expect(function() {
                    scope.watchOrAttend('1234');
                })
                .toThrow();
        });

        it('to throw one parameter', function() {
            var controller = createWatcherController();
            spyOn(scope, 'updateEvents');
            scope.watchOrAttend('id', 'watch');
            expect(apiService.post)
                .toHaveBeenCalled();
        });
    });

    describe('updateEvents', function() {

        it('to throw with no parameters', function() {
            var controller = createWatcherController();
            expect(function() {
                    scope.updateEvents();
                })
                .toThrow();
        });

        it('to throw with incorrect event id', function() {
            var controller = createWatcherController();
            expect(function() {
                    scope.updateEvents('some_id', 'Attending', true);
                })
                .toThrow();
        });

        it('to run with correct id', function() {
            var controller = createWatcherController();
            scope.events = [{
                _id: "some_id"
            }];
            scope.updateEvents('some_id', 'watching', true);
            expect(scope.events[0]['user_is_watching'])
                .toBe(true);
        });

    });

});