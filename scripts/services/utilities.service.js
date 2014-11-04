SU.service("utilityService", function($http) {

    /** 
     * objectDifferences - detects object differences and returns the different values
     * @param  {[Object]} original
     * @param  {[Object]} dirty
     * @return {[Object]} - different values between the two objects
     */
    this.objectDifferences = function(original, dirty) {

        if (!original || !dirty || !_.isPlainObject(original) || !_.isPlainObject(dirty)) {
            throw new Error('params passed to objectDifferences did not exist or were of incorrect format');
        }

        return _.reduce(dirty, function(prev, curr, key) {
            if (curr !== original[key]) prev[key] = dirty[key];
            return prev;
        }, {});
    };


    //CONSTANTS
    this.api_route = "http://localhost:3000";
});