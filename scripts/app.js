// create the module and name it survivorsUnited
var SU = angular.module('SU', ['ngRoute', 'angularCharts', 'ui.calendar']);

SU.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});