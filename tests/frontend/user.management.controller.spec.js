describe('userManagement controller', function() {
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
        spyOn(apiService, "post").and.callFake(
            function() {
                new Promise(function(resolve, reject) {
                    return resolve();
                });
            });

        createController = function() {
            return $controller('userDetailsController', {
                '$scope': scope
            });
        };
    }));

    // DEFAULT PARAMS
    describe('default params', function() {
        it('are setup', function() {
            var controller = createController();
            expect(scope.users).toBeDefined();
            expect(scope.updated).toBeDefined();
            expect(scope.filters).toBeDefined();
        });
    });

    // CLEAR FILTER
    describe('clearFilter function', function() {
        it('cleans and resets the filter', function() {
            var controller = createController();
            scope.searchText = 'dummy search';
            scope.clearFilter();
            expect(scope.filters[0].name).toBe('internal');
            expect(scope.filters[1].name).toBe('severity');
            expect(scope.filters[2].name).toBe('assigned_mentor');
            expect(scope.filters[3].name).toBe('sort');
            expect(scope.searchText).toBe('');
        });

        it('doesnt notify if not required', function() {
            var controller = createController();
            spyOn(notifyService, 'success');
            scope.clearFilter();
            expect(notifyService.success.calls.count()).toEqual(0);
        });

        it('notifies if required', function() {
            var controller = createController();
            spyOn(notifyService, 'info');
            scope.clearFilter(true);
            expect(notifyService.info).toHaveBeenCalled();
            expect(notifyService.info).toHaveBeenCalledWith('Search filters cleared');
        });
    });


    // UPDATED CONTACT 
    describe('updatedContact function', function() {
        it('throws error when localScope is incorrect', function() {
            var controller = createController();
            expect(function() {
                scope.updatedContact();
            }).toThrow();

            expect(function() {
                scope.updatedContact({
                    user: {}
                });
            }).toThrow();
        });
    });

    // SET FILTER 
    describe('setFilter function', function() {
        it('throws error with incorrect params', function() {
            var controller = createController();
            expect(function() {
                scope.setFilter();
            }).toThrow();
        });
    });

    describe('setFilter function', function() {
        it('throws error with incorrectly indexed filter', function() {
            var controller = createController();
            expect(function() {
                scope.setFilter('something_non_existant', 'High');
            }).toThrow();
        });
    });

    describe('setFilter function', function() {
        it('sets value according to passed params', function() {
            var controller = createController();
            expect(scope.filters[1].value).toEqual('All');
            scope.setFilter('severity', 'High');
            expect(scope.filters[1].value).toEqual('High');
        });
    });

    // REMOVE USER
    describe('removeUsers function', function() {

        it('throws if no user', function() {
            var controller = createController();
            expect(function() {
                scope.removeUser();
            }).toThrow();
        });


        it('throws if no user id', function() {
            var controller = createController();
            expect(function() {
                scope.removeUser({_id: undefined});
            }).toThrow();
        });

        it('notifies if required', function() {
            var controller = createController();
            // TODO: MAKE WORK
/*            scope.removeUser({
                _id: "fake_id"
            });

            expect(apiService.post.calls.count()).toEqual(1);*/

        });
    });


    // REFRESH USERS FILTER
    describe('refreshUsers function', function() {
/*        it('doesnt notify if not required', function() {
            var controller = createController();
            spyOn(notifyService, 'notify');
            scope.refreshUsers();
            expect(notifyService.notify.calls.count()).toEqual(0);
        });

        it('notifies if required', function() {
            var controller = createController();
            spyOn(notifyService, 'notify');
            scope.refreshUsers(true);
            expect(notifyService.notify).toHaveBeenCalled();
            expect(notifyService.notify).toHaveBeenCalledWith('Users refreshed');
        });*/
    });
});