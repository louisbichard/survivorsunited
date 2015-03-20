var db = require('../../utilities/database.js');
var utilities_general = require('../../utilities/utilities.general.js');

module.exports = function(req, res, io) {

    console.log('in file');

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

    return db.update('messages', [{
            $or: [id_one, id_two]
        }, {
            $push: {
                messages: message_to_push
            }
        }])
        .then(respond.success);

};