SU.service("dateService", function() {
    var that = this;

    this.formatTimeStampForCal = function(unix_timestamp) {
        if (!unix_timestamp || _.isPlainObject(unix_timestamp) || _.isArray(unix_timestamp)) {
            throw new Error('No unix timestamp passed to formatTimeStampForCal function in dateService');
        }
        date = new Date(unix_timestamp);
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        return new Date(y, m, d);
    };

    // CONSTANTS
    this.DATE_FORMAT = "do, MMMM, YYYY";

    /** 
     * Formats all the properties specified in the given object into moment dates with format DATE_FORMAT
     * @param  {Object}
     * @param  {Array} 
     * @return {Object} - The formatted object
     */
    this.formatDates = function(object, props) {        
        if (!object || !_.isPlainObject(object) || !props || !_.isArray(props)) {
            throw new Error('Parameters passed to format dates are incorrect');
        }

        // TODO: IS PRODUCING THE WRONG DATE FROM TIMESTAMPS
        _.forIn(object, function(value, key) {
            if ($.inArray(key, props) > -1) {
                object[key] = moment(value).format(that.DATE_FORMAT);
            }
        });
        return object;
    };
});