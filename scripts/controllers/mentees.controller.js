SU.controller('menteesController', function($scope, apiService, dateService, notifyService, $route) {

    var is_internal = $route.current.$$route.originalPath === "/mentees";

    $scope.current_path = $route.current.$$route.originalPath.split('/')[1];

    console.log('is it internal?', is_internal);

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
        apiService.post('/chat/send_message', {
            "sender": mentee,
            "reciever": chat_module.current_user._id,
            "message": this.current_message
        }).then(function() {
            chat_module.init();
        });
    };

    $scope.getUserNameFromID = function(id) {
        var all = _.clone(chat_module.contacts);
        all.push(chat_module.current_user);
        var name = _.find(all, {
            _id: id
        }) || {};
        return name.first_name || "Anonymous";
    };

    var chat_module = {
        "CONTACT_API_ROUTE": is_internal ? "/user/assigned_mentees" : "/user/assigned_mentor",
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
            $scope.mentees = chat_module.contacts;
        },
        filterOutSelf: function() {
            chat_module.contacts = _.filter(chat_module.contacts, function(mentee) {
                return mentee;
            });
        },
        attachMessagesToContacts: function(all_messages, index) {
            var messages = all_messages[0] ? all_messages[0].messages : [];
            chat_module.contacts[index].messages = messages;
        },
        getMessages: function() {
            _.each(chat_module.contacts, function(mentee, index) {
                return apiService.get('/chat/get_messages', {
                        "sender": mentee._id,
                        "reciever": chat_module.current_user._id
                    })
                    .then(_.partialRight(chat_module.attachMessagesToContacts, index));
            });
        },
        getContactData: function() {
            return Promise.props({
                "contacts": apiService.get(chat_module.CONTACT_API_ROUTE, null),
                "current_user": apiService.get('/user/current')
            });
        }
    };

    chat_module.init();
});