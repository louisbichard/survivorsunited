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

    // FUNCTION: CONSTANT VALUES 
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

    // FUNCTION: CONSTANT VALUES 
    describe('constant value', function() {
        it('API route is defined', function() {
            expect(utilityService.api_route).toBeString();
        });
    });
});