var db = require('../../utilities/database.js');
var utilities_general = require('../../utilities/utilities.general.js');

module.exports = function(req, res, io) {

    var respond = require('../../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var id_one = {
        "chat_id": req.GET.sender + "-" + req.GET.reciever
    };

    var id_two = {
        "chat_id": req.GET.reciever + "-" + req.GET.sender
    };

    return db.find('messages', [{
            $or: [id_one, id_two]
        }])
        .then(respond.success)
        .caught(function(err) {
            respond.failure('Failed to log chat message', err);
        });

};