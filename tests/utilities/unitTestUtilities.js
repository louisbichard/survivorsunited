TEST = {
    "utilities": {
        "triggerKeyDown": function(element, keyCode) {
            var e = angular.element.Event('keydown');
            e.which = keyCode;
            element.trigger(e);
        }
    }
};