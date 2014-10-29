SU.service("apiService", function($http) {

    var callAPI = function(route, params, options, type) {
        params = params || {};
        options = options || {};

        //TODO: PROMISIFY WITH BLUEBIRD
        return new Promise(function(resolve, reject) {
            //ABSTRACT OUT URL
            $http[type]('http://localhost:3000' + route, params)
                .success(function(data, status, headers, config) {
                    if (data.success) {
                        notification('Success', data.result);

                        // RETURN DATA
                        return resolve(data.result);


                        //notification('Success!', 'user: ' + user.username + "(" + user.id + ") removed!");
                        //$scope.users = [];
                        //refreshUsers();
                        //
                    } else {

                        //TODO: 
                        // 1) REPLACE WITH RELEVANT MESSAGE FOR REJECT
                        // 2) CONSOLE LOG
                        // 3) OPTION FOR ERROR ON FAILURE

                        notification('Oh no!', data.error_message, 'error');
                        return reject('TODO: add some relevant message here');
                    }
                })
                //TODO: IMPLEMENT
                .error(function(data, status, headers, config) {
                    notification('Something went wrong', 'A connection error occured, please try again', 'error');
                    return false;
                });
        });
    };

    //RETURN FACTORY API
    this.get = function(route, params, options) {
        return callAPI(route, params, options, 'get');
    };

    this.post = function(route, params, options) {
        // EXTEND TO INCLUDE POST PARAMS
        return callAPI(route, params, options, 'post');
    };
});