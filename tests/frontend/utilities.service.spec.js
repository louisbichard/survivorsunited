describe('utilityService', function() {

    var scope;
    var chartService;

    //INCLUDE APP
    beforeEach(module('SU'));

    //INCLUDE APP DEPENDENCIES
    beforeEach(function() {
        jasmine.addMatchers(customMatchers);
        module('ngRoute');
        module('angularCharts');
        module('ui.calendar');
    });

    beforeEach(inject(function(_utilityService_) {
        utilityService = _utilityService_;
    }));

    // CONSTANTS
    describe('constant value', function() {
        it('API route is defined', function() {
            expect(utilityService.api_route).toBeString();
        });
    });

    describe('constant value', function() {
        it('date format', function() {
            expect(utilityService.date_format).toBeString();
        });
    });

    describe('objectDifferences', function() {

        it('throws errors if no params', function() {
            expect(utilityService.objectDifferences).toThrow();
        });

        it('throws errors if param passed as string', function() {

            expect(function() {
                utilityService.objectDifferences("", "");
            }).toThrow();

        });

        it('throws errors if params passed as arrays', function() {
            expect(function() {
                utilityService.objectDifferences([], []);
            }).toThrow();

        });

        it('if they are the same they are ignored', function() {

            expect(utilityService.objectDifferences({
                something: "test"
            }, {
                something: "test",
            })).toEqual({});

        });

        it('notices differences between similar keys', function() {

            expect(utilityService.objectDifferences({
                name: "test"
            }, {
                name: "test1"
            })).toEqual({
                name: "test1"
            });

        });

        it('adds the keys if additional keys passed in the dirty object', function() {
            expect(utilityService.objectDifferences({
                name: "test"
            }, {
                name: "test1",
                surname: "test2"
            })).toEqual({
                name: "test1",
                surname: "test2"
            });
        });
    });

    describe('convertDatesToTimeStamps', function() {

        it('throws errors if no params', function() {
            expect(utilityService.convertDatesToTimeStamps).toThrow();
        });

        it('throws errors if param passed as string', function() {
            expect(function() {
                utilityService.convertDatesToTimeStamps("", "");
            }).toThrow();
        });

        it('throws errors if first params is as an array', function() {
            expect(function() {
                utilityService.convertDatesToTimeStamps([]);
            }).toThrow();
        });

        it('notices differences between similar keys', function() {
            expect(utilityService.convertDatesToTimeStamps({
                start: "Fri Nov 07 2014 00:00:00 GMT+0000 (GMT)",
                end: "Fri Nov 07 2014 00:00:00 GMT+0000 (GMT)"
            }, ['start', 'end'])).toEqual({
                start: 1415318400000,
                end: 1415318400000
            });
        });

        it('only converts start', function() {
            expect(utilityService.convertDatesToTimeStamps({
                start: "Fri Nov 07 2014 00:00:00 GMT+0000 (GMT)",
                end: "Fri Nov 07 2014 00:00:00 GMT+0000 (GMT)"
            }, ['start'])).toEqual({
                start: 1415318400000,
                end: "Fri Nov 07 2014 00:00:00 GMT+0000 (GMT)"
            });
        });


        it('only converts end', function() {
            expect(utilityService.convertDatesToTimeStamps({
                start: "Fri Nov 07 2014 00:00:00 GMT+0000 (GMT)",
                end: "Fri Nov 07 2014 00:00:00 GMT+0000 (GMT)"
            }, ['end'])).toEqual({
                start: "Fri Nov 07 2014 00:00:00 GMT+0000 (GMT)",
                end: 1415318400000
            });
        });

    });

});