var db = require('../../utilities/database.js');
var utilities_general = require('../../utilities/utilities.general.js');

module.exports = function(req, res, io) {
    var respond = require('../../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var id_one = {
        "chat_id": req.body.sender + "-" + req.body.reciever
    };

    var id_two = {
        "chat_id": req.body.reciever + "-" + req.body.sender
    };

    var message_to_push = {};

    message_to_push[req.user._id] = req.body.message;


    var db_commands = {
        create_new_record: function() {
            return db.insert('messages', [{
                    chat_id: req.body.sender + "-" + req.body.reciever,
                    messages: [message_to_push]
                }])
                .then(respond.success);
        },
        update_existing_record: function() {
            return db.update('messages', [{
                    $or: [id_one, id_two]
                }, {
                    $push: {
                        messages: message_to_push
                    }
                }])
                .then(respond.success);
        }
    };

    db.find('messages', [{
        $or: [id_one, id_two]
    }]).then(function(messages) {
        // IF CHAT LOG EXISTS, UPDATE IF NOT CREATE
        if (messages.length > 0) {
            db_commands.update_existing_record();
        } else {
            db_commands.create_new_record();

        }
    });
};