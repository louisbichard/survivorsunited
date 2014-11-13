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

    /** 
     * [convertDatesToTimeStamps - Converts dates to timestamps
     * @param  {Object} object - Object with some dates to be overwritten by timestamps
     * @param  {Array} props - Array of properties to overwrite
     * @return {Object} - The original object with appropriate changes
     */
    this.convertDatesToTimeStamps = function(object, props) {
        if(!_.isPlainObject(object) || !_.isArray(props)) {
            throw new Error ('Invalid properties or types passed to convertDatesToTimeStamps');
        }
        _.forIn(object, function(value, key) {
            if ($.inArray(key, props) > -1) {
                object[key] = new Date(value).getTime();
            }
        });
        return object;
    };


    //CONSTANTS
    this.api_route = "http://localhost:3000";
    this.date_format = 'dd-MMMM-yyyy';
});