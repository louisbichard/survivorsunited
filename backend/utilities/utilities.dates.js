var moment = require('moment');

module.exports = {
    unixToReadable: function(unix_timestamp) {
        if (!unix_timestamp) {
            throw new Error('No date provided to unixToReadable function');
        }
        return moment(unix_timestamp).format('Do MMMM YYYY');
    }
};