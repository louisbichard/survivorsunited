describe('assignedMentorFilter', function() {

    var scope;
    var chartService;

    //INCLUDE APP
    beforeEach(module('SU'));

    //INCLUDE APP DEPENDENCIES
    beforeEach(function() {
        module('ngRoute');
        module('angularCharts');
        module('ui.calendar');
    });

    beforeEach(inject(function(_$filter_) {
        $filter = _$filter_;
        assignedMentorFilter = $filter('assignedMentorFilter');
    }));

    describe('errors', function() {
        it('if no filters passed', function() {
            expect(function() {
                assignedMentorFilter([], []);
            }).toThrow();
        });

        it('filter has no value passed', function() {
            expect(function() {
                assignedMentorFilter([], [{
                    name: "assignedMentorFilter"
                }]);
            }).toThrow();
        });

    });

    describe('returns the non assigned users where mentor is not assigned', function() {
        it('for severity users', function() {
            expect(
                    assignedMentorFilter([{
                        mentor: false
                    }], [{
                        name: "assigned_mentor",
                        value: "no"
                    }])
                )
                .toEqual([{
                    mentor: false
                }]);
        });
    });

    describe('returns empty array when requesting unassigned mentors when there are none', function() {
        it('for severity users', function() {
            expect(
                    assignedMentorFilter([{
                        mentor: "some id"
                    }], [{
                        name: "assigned_mentor",
                        value: "no"
                    }])
                )
                .toEqual([]);
        });
    });

    describe('returns empty array when requesting low severity when there are none', function() {
        it('for severity users', function() {
            expect(
                    assignedMentorFilter([{
                        mentor: "some id"
                    }], [{
                        name: "assigned_mentor",
                        value: "yes"
                    }])
                )
                .toEqual([{
                    mentor: "some id"
                }]);
        });
    });

    describe('returns all', function() {
        it('when all requested', function() {
            expect(
                    assignedMentorFilter([{
                        mentor: "yes"
                    }, {
                        mentor: "yes"
                    }], [{
                        name: "assigned_mentor",
                        value: "All"
                    }])
                )
                .toEqual([{
                    mentor: "yes"
                }, {
                    mentor: "yes"
                }]);
        });
    });
});