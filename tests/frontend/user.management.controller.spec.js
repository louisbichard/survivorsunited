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

        // MOCK A RETURNED PROMISE
        spyOn(apiService, 'get')
            .and.returnValue(new Promise(function(resolve) {
                return resolve({});
            }));
        spyOn(apiService, 'post')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));

        spyOn(notifyService, 'success')
            .and.returnValue(new Promise(function(resolve) {
                return resolve();
            }));

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
            expect(scope.users)
                .toBeDefined();
            expect(scope.updated)
                .toBeDefined();
            expect(scope.filters)
                .toBeDefined();
        });
    });

    // CLEAR FILTER
    describe('clearFilter function', function() {
        it('cleans and resets the filter', function() {
            var controller = createController();
            scope.searchText = 'dummy search';
            scope.clearFilter();
            expect(scope.filters[0].name)
                .toBe('internal');
            expect(scope.filters[1].name)
                .toBe('severity');
            expect(scope.filters[2].name)
                .toBe('assigned_mentor');
            expect(scope.filters[3].name)
                .toBe('sort');
            expect(scope.searchText)
                .toBe('');
        });

        it('doesnt notify if not required', function() {
            var controller = createController();
            scope.clearFilter();
            expect(notifyService.success.calls.count())
                .toEqual(0);
        });

        it('notifies if required', function() {
            var controller = createController();
            spyOn(notifyService, 'info');
            scope.clearFilter(true);
            expect(notifyService.info)
                .toHaveBeenCalled();
            expect(notifyService.info)
                .toHaveBeenCalledWith('Search filters cleared');
        });
    });

    // UPDATED CONTACT 
    describe('updatedContact function', function() {
        it('throws error when localScope is incorrect', function() {
            var controller = createController();
            expect(function() {
                    scope.updatedContact();
                })
                .toThrow();

            expect(function() {
                    scope.updatedContact({
                        user: {}
                    });
                })
                .toThrow();
        });
    });

    describe('refreshUsers', function() {
        it('throws error when localScope is incorrect', function() {
            var controller = createController();

            scope.refreshUsers(true)
            expect(function() {
                    scope.updatedContact();
                })
                .toThrow();

            expect(function() {
                    scope.updatedContact({
                        user: {}
                    });
                })
                .toThrow();
        });
    });

    // SET FILTER 
    describe('setFilter function', function() {
        it('throws error with incorrect params', function() {
            var controller = createController();
            expect(function() {
                    scope.setFilter();
                })
                .toThrow();
        });
    });

    describe('setFilter function', function() {
        it('throws error with incorrectly indexed filter', function() {
            var controller = createController();
            expect(function() {
                    scope.setFilter('something_non_existant', 'High');
                })
                .toThrow();
        });
    });

    describe('setFilter function', function() {
        it('sets value according to passed params', function() {
            var controller = createController();
            expect(scope.filters[1].value)
                .toEqual('All');
            scope.setFilter('severity', 'High');
            expect(scope.filters[1].value)
                .toEqual('High');
        });
    });

    describe('removeUsers function', function() {
        it('throws if no user', function() {
            var controller = createController();
            expect(function() {
                    scope.removeUser();
                })
                .toThrow();
        });

        it('throws if no user id', function() {
            expect(function() {
                    scope.removeUser({
                        _id: undefined
                    });
                })
                .toThrow();
        });

        it('calls apiService', function() {
            var controller = createController();
            spyOn(scope, 'removeUserFromScope');
            scope.removeUser({
                _id: 'some id'
            });
            expect(apiService.post)
                .toHaveBeenCalled();

        });
    });

    describe('splice user', function() {
        it('throws if no index specified', function() {
            var controller = createController();
            expect(function() {
                    scope.spliceUser();
                })
                .toThrow();
        });

        it('splices user when there are none', function() {
            var controller = createController();
            scope.spliceUser(0);
            expect(scope.users)
                .toEqual([]);
        });

        it('splices user', function() {
            var controller = createController();
            scope.users = [{
                something: "here"
            }, {
                something_else: "test"
            }];
            scope.spliceUser(0);
            expect(scope.users)
                .toEqual([{
                    something_else: "test"
                }]);
        });

    });

    describe('refresh notification', function() {
        it('launches with true', function() {
            var controller = createController();
            scope.refreshNotification(true);
            expect(notifyService.success)
                .toHaveBeenCalled();
        });
        it('launches with true', function() {
            var controller = createController();
            scope.refreshNotification();
            expect(notifyService.success.calls.count())
                .toEqual(0);
        });
    });

    describe('removeUserFromScope', function() {
        it('throws error with no user', function() {
            var controller = createController();

            expect(function() {
                    scope.removeUserFromScope();
                })
                .toThrow();
        });
        it('launches with true', function() {
            var controller = createController();

            spyOn(scope, 'spliceUser');

            scope.users = [{
                id: "id"
            }];

            scope.removeUserFromScope({
                id: "id"
            });

            expect(scope.users[0].removed)
                .toBe(true);

        });
    });

    describe('updatedContact', function() {
        it('throws', function() {
            var controller = createController();
            expect(function() {
                    scope.updatedContact();
                })
                .toThrow();
        });
        it('throws with empty object', function() {
            var controller = createController();
            expect(function() {
                    scope.updatedContact({});
                })
                .toThrow();
        });
        it('launches with true', function() {
            var controller = createController();
            scope.updated = {
                "id": 'sdfsdf'
            };

            scope.updatedContact({
                user: {
                    _id: 'id'
                }
            });
            // TODO: TEST THAT IT APPLIES TO SCOPE ETC
            expect(apiService.post)
                .toHaveBeenCalled();
        });
    });

    describe('filterMentors', function() {
        it('runs', function() {
            var controller = createController();
            expect(scope.filterMentors({
                    mentor: 'a mentor',
                    'name': 'something'
                }))
                .toBe("a mentor");
        });
    });

    describe('createUpdateObject', function() {
        it('runs', function() {
            var controller = createController();

            scope.updated = [{
                'some_id': {}
            }];

            scope.createUpdateObject({
                mentor: 'a mentor',
                'name': 'something',
                '_id': 'some_id'
            });

            expect(scope.updated)
                .toEqual([{
                    'some_id': {}
                }]);
        });
    });

});