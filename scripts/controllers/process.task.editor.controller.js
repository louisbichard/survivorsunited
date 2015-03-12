SU.controller('taskEditorController', function($scope, apiService, utilityService, notifyService, $route) {
    $scope.config = $route.current.params;
});