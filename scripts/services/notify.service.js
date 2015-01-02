SU.service("notifyService", function() {
    var that = this;

    this.DEFAULTS = {
        "closeButton": false,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    // TODO: MAKE THE ERRORS HANDLE OBJECTS OR ERROR MESSAGES CORRECTLY
    _.each(['success', 'error', 'info', 'warning'], function(type) {
        that[type] = function(header, text, options) {
            var task;
            header = header || "";
            toastr.options = _.defaults(options || {}, this.DEFAULTS);
            toastr[type](text, header);
        };
    });

});