describe('notifyService', function() {

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

    beforeEach(inject(function(_notifyService_) {
        notifyService = _notifyService_;
    }));

    // CONSTANTS
    describe('constant value', function() {
        it('defaults to be defined', function() {
            expect(notifyService.DEFAULTS).toBeDefined();
        });
    });

    // CONSTANTS
    describe('throws error', function() {
        it('type not defined', function() {
            expect(function() {
                notifyService.notify('Some header', 'Some message', 'Invalid header type');
            }).toThrow();
        });
    });

    // CALLS A SUCCESS MESSAGE
    describe('calls', function() {
        it('success message', function() {
            spyOn(toastr, 'success');
            notifyService.notify('Success!');
            expect(toastr.success).toHaveBeenCalled();
        });
        it('success message with no params', function() {
            spyOn(toastr, 'success');
            notifyService.notify();
            expect(toastr.success).toHaveBeenCalled();
        });
    });

    // CALLS AN ERROR MESSAGE
    describe('calls', function() {
        it('error message', function() {
            spyOn(toastr, 'error');
            notifyService.notify('Success!', '', 'error');
            expect(toastr.error).toHaveBeenCalled();
        });
    });

    // CALLS AN INFO MESSAGE
    describe('calls', function() {
        it('info message', function() {
            spyOn(toastr, 'info');
            notifyService.notify('Info!', '', 'info');
            expect(toastr.info).toHaveBeenCalled();
        });
    });

    // CALLS A WARNING MESSAGE
    describe('calls', function() {
        it('warning message', function() {
            spyOn(toastr, 'warning');
            notifyService.notify('Warning!', '', 'warning');
            expect(toastr.warning).toHaveBeenCalled();
        });
    });

});