describe('dateService', function() {

    var scope;
    var dateService;

    //INCLUDE APP
    beforeEach(module('SU'));

    //INCLUDE APP DEPENDENCIES
    beforeEach(function() {
        module('ngRoute');
        module('angularCharts');
        module('ui.calendar');
    });

    beforeEach(inject(function(_dateService_) {
        dateService = _dateService_;
    }));

    describe('constants', function() {
        it("exist", function() {
            expect(dateService.DATE_FORMAT).toBeDefined();
            expect(typeof dateService.DATE_FORMAT).toEqual("string");
        });
    });

    describe('formatDates', function() {
        it("throws error if no params passed", function() {
            expect(function() {
                dateService.formatDates();
            }).toThrow();
        });
        it("throws error if params are of incorrect format", function() {
            expect(function() {
                dateService.formatDates("", "");
            }).toThrow();

            expect(function() {
                dateService.formatDates("", []);
            }).toThrow();
        });
        it("throws error if no params passed", function() {
            expect(dateService.DATE_FORMAT).toBeDefined();
            expect(typeof dateService.DATE_FORMAT).toEqual("string");
        });
        it("fomats dates correctly", function() {
            expect(dateService.formatDates({
                start_date: 1416482677287,
                end_date: 1416482677287
            }, ['start_date', 'end_date'])).toEqual({
                start_date: "4th, November, 2014",
                end_date: "4th, November, 2014"
            });

            expect(dateService.formatDates({
                start_date: 1416482677287,
                end_date: 1416482677287
            }, ['start_date'])).toEqual({
                start_date: "4th, November, 2014",
                end_date: 1416482677287
            });

            expect(dateService.formatDates({}, ['start_date'])).toEqual({});
        });
    });

    describe('formatTimeStampForCal', function() {
        it("throws error with no param", function() {
            expect(dateService.formatTimeStampForCal).toThrow();
        });

        it("throws error with string or array param", function() {

            expect(function() {
                dateService.formatTimeStampForCal("");
            }).toThrow();

            expect(function() {
                dateService.formatTimeStampForCal([]);
            }).toThrow();

        });

        it('accepts a timestamp and outputs object', function() {
            expect(
                typeof dateService.formatTimeStampForCal(1415182484389)
            ).toEqual("object");
        });
    });

});