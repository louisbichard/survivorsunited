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

    _.each(['success', 'error', 'info', 'warning'], function(type) {
        that[type] = function(header, text, options) {
            var task;
            header = header || "";
            // ADD FALL BACKS FOR TEXT
            text = that.formatText(text);
            toastr.options = _.defaults(options || {}, this.DEFAULTS);
            toastr[type](text, header);
        };
    });

    that.formatText = function(text) {
        // IF THE TEXT IS PASSED AS AN ONJECT, HANDLE APPROPRIATELY
        if (_.isPlainObject(text)) {
            text = text.error_message || "";
        } else {
            text = text;
        }
        return text;
    };

});
