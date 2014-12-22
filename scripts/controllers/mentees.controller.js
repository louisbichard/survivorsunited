// TYPE:    controller
// PARTIAL: mentees.html

SU.controller('menteesController', function($scope, apiService, dateService, notifyService) {
    $scope.chat = [];
    $scope.message = {};

    // TODO: FILTER OUT THE MENTER THEMSELVES
    $scope.filterOutSelf = function(mentee) {
        return mentee;
    };

    /*
        socket.on('messages', function(data) {
            console.log('recieved new message');
            notifyService.success('recieved message');
            $scope.$apply(function(){
                $scope.chat.push(data);
            });
        });*/

    /*$scope.emitMessage = function() {
        apiService.get('/chat', $scope.message);
    };*/

    $scope.getMenteeData = function() {
        return apiService
            .get('/user/assigned_mentees', null, {
                preventNotifications: true
            })
            .then(function(result) {
                $scope.$apply(function() {
                    $scope.mentees = _.filter(result, $scope.filterOutSelf);
                    $scope.mentees = dateService.formatDatesArray($scope.mentees, ['date_created']);
                });
            });
    };

    $scope.getMenteeData();
});
