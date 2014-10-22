var utility_dates = require('../../utilities/utilities.dates.js');

describe("Unix Date utility", function() {

    it("Returns a date in format", function() {
        expect(typeof utility_dates.unixToReadable(new Date().getTime())).toBe('string');
    });

    // TODO: it("Errors if no date found", function() {

});