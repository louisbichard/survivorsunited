SU.service("notifyService", function() {
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

    this.notify = function(header, text, type, options) {
        var task;
        header = header || "";
        type = type || "success";
        toastr.options = _.defaults(options || {}, this.DEFAULTS);

        var toastTypes = ['success', 'error', 'warning', 'info'];
        if ($.inArray(type, toastTypes) != -1) toastr[type](text, header);
        else throw new Error('toast type is not defined in notify function');
    };

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