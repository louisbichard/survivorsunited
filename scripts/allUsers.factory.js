SU.factory("allUsersFactory", function($http) {
    return $http
        .get('http://localhost:3000/user/listall')
        .success(function(data, status, headers, config) {
            return _.map(data, function(user) {
                var unix_date = user.date_created;
                var js_date = new Date(unix_date);
                user.date_created = moment(js_date).format('Do MMM YYYY, HH:mm');
                return user;
            });
        })
        .error(function(data, status, headers, config) {
            // **TODO:** Imlement better error handling
            return false;
        });
});