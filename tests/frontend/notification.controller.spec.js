describe('notificationController', function() {

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

        createController = function() {
            return $controller('notificationController', {
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

    describe('assignReultsToScope', function() {
        it('functions', function() {
            var controller = createController();

            scope.assignReultsToScope({
                tasks: [],
                user: []
            });
            expect(scope.user).toEqual([]);
            expect(scope.tasks).toEqual([]);
        });
    });

    describe('getIndexOf', function() {
        it('functions', function() {
            var controller = createController();

            scope.tasks = [{
                _id: 'something1',
            }, {
                _id: 'something2'
            }];

            expect(scope.getIndexOf('something1')).toEqual(0);
            expect(scope.getIndexOf('something2')).toEqual(1);
        });
    });

    describe('ammendUpdateObject', function() {
        it('calls relevant functions', function() {
            var controller = createController();

            scope.ammendUpdateObject('some_id', 'rating', 4);
            scope.ammendUpdateObject('some_id', 'comment', 'wooo');
            expect(scope.ratings_to_update).toEqual({
                'some_id': {
                    'rating': {
                        'rating': 4,
                        'comment': 'wooo'
                    }
                }
            });
        });
    });

    describe('updateTasksObject', function() {
        it('calls relevant functions', function() {
            var controller = createController();
            scope.tasks = [{
                '_id': 'some_id',
                'assignees': {
                    'assignee_id': {
                        'rating': {
                            'rating': 5
                        }
                    }
                }
            }];

            scope.user = {};
            scope.user._id ='assignee_id';

            scope.updateTasksObject('some_id', 'rating', 4);
            expect(scope.tasks).toEqual([{
                '_id': 'some_id',
                'assignees': {
                    'assignee_id': {
                        'rating': {
                            'rating': 4
                        }
                    }
                }
            }]);
        });
    });

    describe('updateRating', function() {
        it('calls relevant functions', function() {
            var controller = createController();
            spyOn(scope, 'ammendUpdateObject');
            spyOn(scope, 'updateTasksObject');
            scope.updateRating();
            expect(scope.ammendUpdateObject).toHaveBeenCalled();
            expect(scope.updateTasksObject).toHaveBeenCalled();
        });
    });


    describe('setRating', function() {
        it('gives notification of error', function() {
            var controller = createController();
            scope.setRating();
            expect(notifyService.error).toHaveBeenCalled();
        });
        it('updates', function() {
            var controller = createController();
            scope.setRating('some rating', 'some task id');
            expect(apiService.post).toHaveBeenCalled();
        });
    });

});