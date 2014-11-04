SU.service("apiService", function($http, utilityService) {

    var callAPI = function(route, params, options, type) {
        params = params || {};
        options = options || {};

        //ABSTRACT OUT URL
        return $http[type](utilityService.api_route + route, params)
            .success(function(data, status, headers, config) {
                if (data.success) {

                    // TODO:  MAKE THIS OPTIONAL
                    notification('Success', data.result);
                    return data.result;
                } else {

                    //TODO: 
                    // 1) REPLACE WITH RELEVANT MESSAGE FOR REJECT
                    // 2) CONSOLE LOG
                    // 3) OPTION FOR ERROR ON FAILURE

                    console.log("WERE HERE!");
                    if (!data.error_message) {
                        notification('Oh no', 'An unknown error occured', 'error');
                        return false;
                    } else {
                        notification('Oh no', data.error_message, 'error');
                        return data.error_message;
                    }
                }
            })

        //TODO: IMPLEMENT
        .error(function(data, status, headers, config) {
            notification('Something went wrong', 'A connection error occured, please try again', 'error');
            return false;
        });

    };

    //RETURN FACTORY API
    this.get = function(route, params, options) {
        if (!route || !_.isString(route)) {
            throw new Error('No route specified to apiService in get function');
        }
        return callAPI(route, params, options, 'get');
    };

    this.post = function(route, params, options) {
        if (!route || !_.isString(route)) {
            throw new Error('No route specified to apiService in post function');
        }
        // EXTEND TO INCLUDE POST PARAMS
        return callAPI(route, params, options, 'post');
    };
});