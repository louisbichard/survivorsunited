// TYPE:    controller
// PARTIAL: mentees.html

SU.controller('menteesController', function($scope, apiService, dateService, notifyService) {
    $scope.chat = {};
    $scope.messages = {};

    // TODO: FILTER OUT THE MENTER THEMSELVES
    $scope.filterOutSelf = function(mentee) {
        return mentee;
    };

    $scope.storeMessage = function(id) {
        console.log('message id', id);
    };

    $scope.socketListen = function(ids) {
        // ids[0] is mentee
        // ids[1] is mentor
        var chat_id = ids.sort().join('-');

        socket.on(chat_id, function(data) {
            $scope.$apply(function() {
                $scope.chat[ids[1]] = $scope.chat[ids[1]] || [];
                $scope.chat[ids[1]].push(data.message);
            });
        });
    };

    $scope.emitMessage = function(mentee) {
        var payload = {
            message: $scope.messages[mentee._id],
            // AN ARRAY OF THE USERS IN THE CONVERSATION (INITIALLY LIMITED TO 2)
            chat_id: [$scope.current_user._id, mentee._id].sort().join('-')
        };
        apiService.post('/chat', payload);
    };

    $scope.getMenteeData = function() {
        return Promise.props({
                "mentees": apiService
                    .get('/user/assigned_mentees', null),
                "current_user": apiService.get('/user/current')
            })
            .then(function(result) {
                _.each(result.mentees, function(mentee) {
                    $scope.socketListen([mentee._id, result.current_user._id]);
                });

                $scope.$apply(function() {
                    $scope.current_user = result.current_user;
                    $scope.mentees = _.filter(result.mentees, $scope.filterOutSelf);
                    $scope.mentees = dateService.formatDatesArray($scope.mentees, ['date_created']);
                });
            });
    };

    $scope.getMenteeData();
});