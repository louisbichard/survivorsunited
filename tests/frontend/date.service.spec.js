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