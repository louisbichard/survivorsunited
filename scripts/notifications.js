var notification = function(header, text, type, options) {
    var task;
    header = header || "";
    type = type || "success";
    options = options || {};
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
    toastr.options = options;

    var toastTypes = ['success', 'error', 'warning', 'info'];
    if (type in toastTypes != -1) toastr[type](text, header);
};

var REST_notification = function(API_return, title) {
    var result = API_return.result;
    var error_message = API_return.error_message;
    var success = API_return.success;

    if (API_return.success === true) {

        //TODO: VALIDATE IF RESULT IS NOT STRING
        title = title || "Success";
        notification(title, result);
        
    } else {

        //TODO: VALIDATE IF NO ERROR MESSAGE
        title = title || "Something went wrong";
        notification(title, error_message, 'error');
    }

};