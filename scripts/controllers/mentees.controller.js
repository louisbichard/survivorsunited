SU.controller('menteesController', function($scope, apiService, dateService, notifyService) {
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
        console.log('emit');
        apiService.post('/chat/send_message', {
            "sender": mentee,
            "reciever": chat_module.current_user._id,
            "message": this.current_message
        }).then(function(){
            chat_module.init();
        });

    };

    $scope.getUserNameFromID = function(id) {
        var all = _.clone(chat_module.mentees);
        all.push(chat_module.current_user);
        var name = _.find(all, {
            _id: id
        }) || {};
        return name.first_name || "Anonymous";
    };

    var chat_module = {
        init: function() {
            this.setupScope();
            this.getContactData()
                .then(chat_module.bindResultsToModule)
                .then(chat_module.filterOutSelf)
                .then(chat_module.getMessages)
                .then(chat_module.bindToScope)
                .caught(function(err) {
                    // TODO: MAKE A BETTER ERROR MESSAGE HERE
                    console.log(err);
                    console.log('Could not get messages');
                });
        },
        setupScope: function() {
            $scope.current_message = "";
        },
        bindResultsToModule: function(results) {
            return _.extend(chat_module, results);
        },
        bindToScope: function() {
            console.log('binding to scope');
            $scope.mentees = chat_module.mentees;
        },
        filterOutSelf: function() {
            chat_module.mentees = _.filter(chat_module.mentees, function(mentee) {
                return mentee;
            });
        },
        attachMessagesToMentor: function(messages, index) {
            chat_module.mentees[index].messages = messages[0].messages;
        },
        getMessages: function() {
            _.each(chat_module.mentees, function(mentee, index) {
                return apiService.get('/chat/get_messages', {
                        "sender": mentee._id,
                        "reciever": chat_module.current_user._id
                    })
                    .then(_.partialRight(chat_module.attachMessagesToMentor, index));
            });
        },
        getContactData: function() {
            return Promise.props({
                "mentees": apiService.get('/user/assigned_mentees', null),
                "current_user": apiService.get('/user/current')
            });
        }
    };

    chat_module.init();
});