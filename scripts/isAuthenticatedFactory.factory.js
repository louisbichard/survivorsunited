SU.factory("isAuthenticatedFactory", function($http) {
    return $http
        .get('http://localhost:3000/auth/isauthenticated')
        .success(function(data, status, headers, config) {
            return data;
        })
        .error(function(data, status, headers, config) {
            return false;
        });
});