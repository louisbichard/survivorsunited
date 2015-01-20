var db = require('../utilities/database.js');
var utilities_general = require('../utilities/utilities.general.js');

module.exports = function(req, res, io) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var POST = req.body;

    return db.insert('messages', [{
            message: POST.message,
            chat_id: POST.chat_id
        }])
        .then(function(result) {

            io.emit(POST.chat_id, {
                message: POST.message
            });

            return respond.success('Chat message');

        })
        .caught(function(err) {
            respond.failure('Failed to log chat message', err);
        });

};