SU.service("apiService", function($http, utilityService, notifyService) {
    var that = this;

    this.callAPI = function(route, params, options, type) {
        return new Promise(function(resolve, reject) {
            return $http[type](utilityService.api_route + route, params)
                .success(_.partialRight(that.handleSuccessfulResponse, resolve, reject, options))
                .error(_.partialRight(that.handleFailedResponse, reject));
        });
    };

    //RETURN FACTORY API
    this.get = function(route, params, options) {
        params = params || {};
        options = options || {};

        if (!route || !_.isString(route)) {
            throw new Error('No route specified to apiService in get function');
        }
        return that.callAPI(route, params, options, 'get');
    };

    this.post = function(route, params, options) {
        params = params || {};
        options = options || {};

        if (!route || !_.isString(route)) {
            throw new Error('No route specified to apiService in post function');
        }
        // EXTEND TO INCLUDE POST PARAMS
        return that.callAPI(route, params, options, 'post');
    };

    this.handleFailedResponse = function(data, status, headers, config, reject) {
        if (!data || !status || !headers || !config || !reject) {
            notifyService.error('Unspecified error');
            throw new Error('Cannot handle API failed reponse without correct params');
        }
        notifyService.error('Something went wrong', 'A connection error occured, please try again');
        return reject('An unspecified error occurred');
    };

    this.handleSuccessfulResponse = function(data, status, headers, config, resolve, reject, options) {
        if (!data || !status || !headers || !config || !resolve || !reject || !options) {
            throw new Error('Cannot handle successful API reponse without correct params');
        }

        // APIS RETURNED MIGHT BE SUCCESSFUL BUT INTERNALL FAIL, THIS IS HANDLED HERE
        if (data.success) that.handleSuccessfulAPI(options, resolve, data);
        else that.handleFailedAPI(options, reject, data);
    };

    this.handleFailedAPI = function(options, reject, data) {
        if (!data || !reject || !options) {
            throw new Error('Cannot handle failed API reponse without correct params');
        }

        // IF RETURNED API HAS NO ERROR MESSAGE
        if (!data.error_message) {
            if (!options.preventNotifications) notifyService.error('Oh no', 'An unknown error occured');
            return reject(false);

            // IF RETURNED API HAS ERROR MESSAGE
        } else {
            if (!options.preventNotifications) notifyService.error('Oh no', data.error_message);
            return reject(data.error_message);
        }
    };

    this.handleSuccessfulAPI = function(options, resolve, data) {
        if (!data || !resolve || !options) {
            throw new Error('Cannot handle successful API reponse without correct params');
        }

        if (!options.preventNotifications) {
            notifyService.success('Success');
        }

        return resolve(data.result);
    };

});