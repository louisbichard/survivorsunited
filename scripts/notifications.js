var notification = function(header, text, type, options) {
    var task;
    var header = header || "";
    var type = type || "success";
    var options = options || {};
    options = _.defaults(options, {
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
    });
    if (!!options.promisifyOnHidden) {
        task = Promise.defer();
        options["onHidden"] = function() {
            task.resolve();
        };
    }
    toastr.options = options;

    var toastTypes = ['success', 'error', 'warning', 'info'];
    if (type in toastTypes != -1) toastr[type](text, header);
    if (!!options.promisifyOnHidden) {
        return task.promise;
    }
}