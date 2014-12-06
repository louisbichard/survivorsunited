describe('taskDataService', function() {

    var scope;
    var taskDataService;

    //INCLUDE APP
    beforeEach(module('SU'));

    //INCLUDE APP DEPENDENCIES
    beforeEach(function() {
        module('ngRoute');
        module('angularCharts');
        module('ui.calendar');
    });

    beforeEach(inject(function(_taskDataService_) {
        taskDataService = _taskDataService_;
    }));

    describe('getComments', function() {
        it("throws error", function() {
            expect(function() {
                taskDataService.getComments();
            }).toThrow();
            expect(function() {
                taskDataService.getComments('');
            }).toThrow();
        });
        it("functions", function() {
                        expect(taskDataService.getComments({
                assignees: {
                    'some_id': {
                        rating: {
                            comment: 'I liked it'
                        }
                    },
                    'some_id_other_id': {
                        rating: {
                            comment: 'I liked it too'
                        }
                    }
                }
            })).toEqual(['I liked it', 'I liked it too']);

            expect(taskDataService.getComments({
                assignees: {
                    'some_id': {
                        rating: {}
                    },
                    'some_id_other_id': {
                        rating: {}
                    }
                }
            })).toEqual([]);

            expect(taskDataService.getComments({
                assignees: {}
            })).toEqual([]);
        });
    });

    describe('getRatings', function() {
        it("throws error", function() {
            expect(function() {
                taskDataService.getRatings();
            }).toThrow();
            expect(function() {
                taskDataService.getRatings('');
            }).toThrow();
        });
        it("functions", function() {

            expect(taskDataService.getRatings({
                assignees: {
                    'some_id': {
                        rating: {
                            score: 4
                        }
                    },
                    'some_id_other_id': {
                        rating: {
                            score: 5
                        }
                    }
                }
            })).toEqual([4, 5]);
            expect(taskDataService.getRatings({
                assignees: {
                    'some_id': {
                        rating: {}
                    },
                    'some_id_other_id': {
                        rating: {}
                    }
                }
            })).toEqual([]);

            expect(taskDataService.getRatings({
                assignees: {}
            })).toEqual([]);

        });
    });

});