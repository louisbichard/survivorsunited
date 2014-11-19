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
            toastr.options = _.defaults(options || {}, this.DEFAULTS);
            toastr[type](text, header);
        };
    });

    /* this.question = function(message) {
        // SET DEFAULT WITH NO OVERRIDE
        message = message || "Are you sure?";
        toastr.options = _.defaults({
            timeOut: 10000
        }, this.DEFAULTS);

        toastr.info(
            [
                "<p> ",
                message,
                " </p> ",
                " <div class=\"btn-group\">",
                "<button type = \"button\" class = \"btn btn-default btn-success\" >Yes </button>",
                "<button type = \"button\" class = \"btn btn-default btn-danger\">No </button>",
                "</div>"
            ]);
    };
*/
});