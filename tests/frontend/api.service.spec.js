describe('apiService', function() {

    var scope;
    var apiService;

    //INCLUDE APP
    beforeEach(module('SU'));

    //INCLUDE APP DEPENDENCIES
    beforeEach(function() {
        module('ngRoute');
        module('angularCharts');
        module('ui.calendar');
    });

    beforeEach(inject(function(_apiService_, _$httpBackend_) {
        apiService = _apiService_;
        $httpBackend = _$httpBackend_;
    }));

    /*it("successful notification sent", function() {

        $httpBackend.whenGET('http://localhost:3000/users/listall').respond({
            success: 'true'
        }, {
            result: {}
        });

        apiService.get('/users/listall')
            .then(function(data) {
                expect(data.data.success).toBe('true');
            });

        $httpBackend.flush();
    });

    it("successful notification sent", function() {

        $httpBackend.whenPOST('http://localhost:3000/users/add').respond({
            success: 'true'
        }, {
            result: 'User added successfully!'
        });

        apiService.post('/users/add')
            .then(function(data) {
                expect(data.data.success).toBe('true');
            });

        $httpBackend.flush();
    });

    it("errors for unsuccessful API errors without error message", function() {

        $httpBackend.whenGET('http://localhost:3000/users/listall').respond({
            success: 'false'
        });

        apiService.get('/users/listall')
            .then(function(result) {
                expect(result.data.success).toBe('false');
            });

        $httpBackend.flush();
    });


    it("errors for unsuccessful API errors without error message", function() {

        expect(function() {
            apiService.get();
        }).toThrow();

        expect(function() {
            apiService.post();
        }).toThrow();

    });

    it("errors for incorrect API route params", function() {

        expect(function() {
            apiService.get({});
        }).toThrow();

        expect(function() {
            apiService.post({});
        }).toThrow();

    });

    it("errors for incorrect API route params", function() {

        expect(function() {
            apiService.get([]);
        }).toThrow();

        expect(function() {
            apiService.post([]);
        }).toThrow();

    });
*/
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

});