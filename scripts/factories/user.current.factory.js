SU.factory("currentUserFactory", function($http) {
    return $http
        .get('http://localhost:3000/user/current')
        .success(function(data, status, headers, config) {
            return data;
        })
        .error(function(data, status, headers, config) {
            return false;
        });
});