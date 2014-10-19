var object_differences = function(original, dirty, options) {
    options = options || {};
    var ignore_val = options.ignore;

    if (ignore_val && typeof ignore_val === "string") {

        delete original[ignore_val];
        delete dirty[ignore_val];

    } else if (ignore_val && ignore_val instanceof Array) {

        _.each(ignore_val, function(prop) {
            delete original[prop];
            delete dirty[prop];
        });

    }

    return _.reduce(dirty, function(prev, curr, key) {
        if (curr !== original[key]) prev[key] = dirty[key];
        return prev;
    }, {});

};