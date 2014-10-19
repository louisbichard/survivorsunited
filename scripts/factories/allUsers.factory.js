SU.factory("allUsersFactory", function($http) {
    return $http
        .get('http://localhost:3000/users/listall')
        .success(function(data, status, headers, config) {
            return data.result.users;
        })
        .error(function(data, status, headers, config) {
            // **TODO:** Imlement better error handling
            return false;
        });
});