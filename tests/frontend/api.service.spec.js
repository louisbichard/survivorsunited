describe('apiService', function() {

    var scope;
    var apiService;
    var notifyService;

    // USED FOR SPYING ON BLUEBIRD METHODS TO SEE IF THEY HAVE BEEN CALLED
    var fake_bluebird = {
        'reject': function() {},
        'respond': function() {}
    };

    //INCLUDE APP
    beforeEach(module('SU'));

    //INCLUDE APP DEPENDENCIES
    beforeEach(function() {
        module('ngRoute');
        module('angularCharts');
        module('ui.calendar');
    });

    beforeEach(inject(function(_apiService_, _$httpBackend_, _notifyService_) {
        apiService = _apiService_;
        notifyService = _notifyService_;
        $httpBackend = _$httpBackend_;
    }));

    // GET FUNCTION
    describe('Get function', function() {
        it('Throws error when unsuccessful', function() {
            expect(function() {
                apiService.get();
            }).toThrow();
        });

        it('Passes successfully', function() {
            spyOn(apiService, 'callAPI');
            apiService.get('/events/add');
            expect(apiService.callAPI).toHaveBeenCalled();
        });
    });

    // POST FUNCTION
    describe('POST function', function() {
        it('Throws error when unsuccessful', function() {
            expect(function() {
                apiService.post();
            }).toThrow();
        });

        it('Passes successfully', function() {
            spyOn(apiService, 'callAPI');
            apiService.post('/events/add');
            expect(apiService.callAPI).toHaveBeenCalled();
        });
    });



    describe('handleSuccessfulResponse', function() {
        it("throws error without any params", function() {
            expect(function() {
                apiService.handleSuccessfulResponse();
            }).toThrow();
        });
        it("when success true", function() {
            spyOn(apiService, 'handleSuccessfulAPI');
            apiService.handleSuccessfulResponse({
                success: true
            }, {}, {}, {}, {}, {}, {}, {});
            expect(apiService.handleSuccessfulAPI).toHaveBeenCalled();
        });
        it("when success false", function() {
            spyOn(apiService, 'handleFailedAPI');
            apiService.handleSuccessfulResponse({
                success: false
            }, {}, {}, {}, {}, {}, {}, {});
            expect(apiService.handleFailedAPI).toHaveBeenCalled();
        });
    });


    describe('handleFailedAPI', function() {
        it("throws error without any params", function() {
            expect(function() {
                apiService.handleFailedAPI();
            }).toThrow();
        });
        it("when no error message and notifications on as default", function() {
            spyOn(notifyService, 'error');
            spyOn(fake_bluebird, 'reject');
            apiService.handleFailedAPI({}, fake_bluebird.reject, {});
            expect(notifyService.error).toHaveBeenCalled();
            expect(notifyService.error.calls.count()).toEqual(1);
            expect(fake_bluebird.reject).toHaveBeenCalled();
            expect(fake_bluebird.reject).toHaveBeenCalledWith(false);
        });
        it("when no error message and notifications false", function() {
            spyOn(notifyService, 'error');
            spyOn(fake_bluebird, 'reject');
            apiService.handleFailedAPI({preventNotifications: true}, fake_bluebird.reject, {});
            expect(notifyService.error.calls.count()).toEqual(0);
            expect(fake_bluebird.reject).toHaveBeenCalled();
            expect(fake_bluebird.reject).toHaveBeenCalledWith(false);
        });
        it("when error message and notifications on as default", function() {
            spyOn(notifyService, 'error');
            spyOn(fake_bluebird, 'reject');
            apiService.handleFailedAPI({}, fake_bluebird.reject, {
                error_message: 'something'
            });
            expect(notifyService.error).toHaveBeenCalled();
            expect(notifyService.error.calls.count()).toEqual(1);
            expect(fake_bluebird.reject).toHaveBeenCalled();
            expect(fake_bluebird.reject).toHaveBeenCalledWith('something');
        });
        it("when error message and notifications off as default", function() {
            spyOn(notifyService, 'error');
            spyOn(fake_bluebird, 'reject');
            apiService.handleFailedAPI({preventNotifications: true}, fake_bluebird.reject, {
                error_message: 'something'
            });
            expect(notifyService.error.calls.count()).toEqual(0);
            expect(fake_bluebird.reject).toHaveBeenCalled();
        });
    });

    describe('handleSuccessfulAPI', function() {
        it("throws error without any params", function() {
            expect(function() {
                apiService.handleFailedAPI();
            }).toThrow();
        });
    });


    /*
        it("launches error and displays error message API response", function(done) {
            new Promise(function(resolve, reject) {
                    apiService.handleSuccessfulResponse({
                        success: false,
                        error_message: 'some string'
                    }, null, null, null, resolve, reject, {});
                })
                .caught(function(data) {
                    spyOn(notifyService, 'error');
                    expect(notifyService.error).toHaveBeenCalled();
                    done();
                });
        });*/


    /*it("sends successful API response", function(done) {
        new Promise(function(resolve, reject) {
            apiService.handleSuccessfulResponse({
                success: true,
                result: {
                    some_data: 'test'
                }
            }, null, null, null, resolve, reject, {});
        }).then(function(data) {

            expect(data).toEqual({
                some_data: 'test'
            });

            done();

        });

    });
*/

});