// create the module and name it survivorsUnited
SU = angular.module('SU', ['ngRoute', 'ui.calendar', 'ui.bootstrap', 'angular-loading-bar', 'angular-intro', 'angular-percentagebar', 'chart.js', 'uiGmapgoogle-maps']);

SU.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});