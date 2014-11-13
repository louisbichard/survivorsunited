SU.service("apiService", function($http, utilityService, notifyService) {

    /**
     * [callAPI description]
     * @param  {[type]} route   [description]
     * @param  {[type]} params  [description]
     * @param  {Object} options
     *                          preventNotifications: {Boolean} prevents success notification
     * @param  {String} type    POST or GET
     * @return {[type]}         Result from api
     */
    this.callAPI = function(route, params, options, type) {
        params = params || {};
        options = options || {};

        //ABSTRACT OUT URL
        return new Promise(function(resolve, reject) {
            return $http[type](utilityService.api_route + route, params)
                .success(function(data, status, headers, config) {
                    if (data.success) {
                        // TODO:  MAKE THIS OPTIONAL
                        if (!options.preventNotifications) {
                            notifyService.notify('Success', data.result);
                        }
                        return resolve(data.result);
                    } else {

                        //TODO: 
                        // 1) REPLACE WITH RELEVANT MESSAGE FOR REJECT
                        // 2) CONSOLE LOG
                        // 3) OPTION FOR ERROR ON FAILURE
                        if (!data.error_message) {
                            if (!options.preventNotifications) {
                                notifyService.notify('Oh no', 'An unknown error occured', 'error');
                            }
                            return reject(false);
                        } else {
                            if (!options.preventNotifications) {
                                notifyService.notify('Oh no', data.error_message, 'error');
                            }
                            return reject(data.error_message);
                        }
                    }
                })

            //TODO: IMPLEMENT
            .error(function(data, status, headers, config) {
                notifyService.notify('Something went wrong', 'A connection error occured, please try again', 'error');
                return reject('TODO MAKE BETTER');
            });
        });

    };

    //RETURN FACTORY API
    this.get = function(route, params, options) {
        if (!route || !_.isString(route)) {
            throw new Error('No route specified to apiService in get function');
        }
        return this.callAPI(route, params, options, 'get');
    };

    this.post = function(route, params, options) {
        if (!route || !_.isString(route)) {
            throw new Error('No route specified to apiService in post function');
        }
        // EXTEND TO INCLUDE POST PARAMS
        return this.callAPI(route, params, options, 'post');
    };
});