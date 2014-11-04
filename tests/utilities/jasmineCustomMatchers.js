var customMatchers = {
    toBeString: function(util, customEqualityTesters) {
        return {
            compare: function(actual, expected) {
                var result = {};
                result.pass = _.isString(actual) ? true : false;
                result.message = "Expected " + actual + " to be string";
                return result;
            }
        };
    }
};