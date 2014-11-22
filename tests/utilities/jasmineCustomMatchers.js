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
    },
    toBePromise: function(util, customEqualityTesters) {
        return {
            compare: function(actual, expected) {
                var result = {};
                // A LITTLE BIT OF A HACK, JUST CHECK IF THE OBJECT HAS THIS OBSCURE BLUEBIRD PROP, SHOULD BE OKAY.    
                result.pass = _.isNumber(actual._bitField);
                return result;
            }
        };
    }
};