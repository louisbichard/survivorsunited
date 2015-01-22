SU.controller('usersWatchingEventController', function($scope, $routeParams, apiService) {
    $scope.event_id = $routeParams.id;
    $scope.type = $routeParams.type;

    $scope.getUsers = function() {
        return apiService.get('/events/listWatchersOrAttendees', {
                'id': $scope.event_id,
                'type': $scope.type
            }, {
                preventNotifications: true
            })
            .then($scope.assignResultToUsers);
    };

    $scope.assignResultToUsers = function(data) {
        $scope.$apply(function() {
            $scope.users = data.users;
            $scope.event_title = data.title;
        });
    };

    $scope.printDiv = function(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
        var popupWin = window.open('', '_blank', 'width=300,height=300');
        popupWin.document.open()
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</html>');
        popupWin.document.close();
    };

    if (!$scope.event_id || !$scope.type) {
        $scope.error_message = "oh no!";
    } else {
        $scope.getUsers();
    }
});