describe('userDataService', function() {
    var scope;
    var chartService;
    var createController;
    var userDataService;

    //INCLUDE APP
    beforeEach(module('SU'));

    //INCLUDE APP DEPENDENCIES
    beforeEach(function() {
        module('ngRoute');
        module('angularCharts');
        module('ui.calendar');
    });

    beforeEach(inject(function($rootScope, $controller, _userDataService_) {
        scope = $rootScope.$new();

        userDataService = _userDataService_;

    }));

    describe('countMissingMentors', function() {
        it('rejects inappropriate parameters', function() {
            expect(function() {
                    userDataService.countMissingMentors();
                })
                .toThrow();
            expect(function() {
                    userDataService.countMissingMentors({});
                })
                .toThrow();
        });
        it('counts appropriately', function() {
            expect(userDataService.countMissingMentors([{
                    mentor: false
                }, {
                    mentor: true
                }]))
                .toBe(1);
            expect(userDataService.countMissingMentors([{
                    mentor: true
                }, {
                    mentor: true
                }]))
                .toBe(0);
        });
    });

    describe('countRole', function() {
        it('rejects inappropriate parameters', function() {
            expect(function() {
                    userDataService.countRole();
                })
                .toThrow();
            expect(function() {
                    userDataService.countRole({});
                })
                .toThrow();
        });
        it('counts appropriately', function() {
            expect(userDataService.countRole('Admin', [{
                    role: 'Admin'
                }, {
                    role: 'Admin'
                }]))
                .toBe(2);
            expect(userDataService.countRole('Admin', []))
                .toBe(0);
        });
    });

    describe('countStatus', function() {
        it('counts appropriately', function() {
            expect(userDataService.countStatus([], 'open', {
                    _id: 'something'
                }))
                .toBe(0);

            expect(userDataService.countStatus([{
                    assignees: {
                        something: {
                            status: 'open'
                        }
                    }
                }], 'open', {
                    _id: 'something'
                }))
                .toBe(1);
        });
    });

});