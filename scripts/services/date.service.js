SU.service("dateService", function() {
    this.formatTimeStampForCal = function(unix_timestamp) {
        if(!unix_timestamp || _.isPlainObject(unix_timestamp) || _.isArray(unix_timestamp))  {
            throw new Error('No unix timestamp passed to formatTimeStampForCal function in dateService');
        }
        date = new Date(unix_timestamp);
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        return new Date(y, m, d);
    };
});