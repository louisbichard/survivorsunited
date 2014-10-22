/** 
 * [object_differences - detects object differences and returns the different values]
 * @param  {[Object]} original
 * @param  {[Object]} dirty
 * @param  {[string/array]} options - an array or string of object values to ignore when making comparison
 * @return {[Object]} - different values between the two objects
 */
var object_differences = function(original, dirty, options) {
    options = options || {};
    var ignore_val = options.ignore;

    // HANDLE IGNORE VALUE AS STRING
    if (ignore_val && typeof ignore_val === "string") {

        delete original[ignore_val];
        delete dirty[ignore_val];

        // HANDLE IGNORE VALUE AS ARRAY
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


var APP = {
    utilties: {
        api_route: "http://localhost:3000"
    }
};