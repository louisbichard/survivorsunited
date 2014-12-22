var db = require('../utilities/database.js');
var utilities_general = require('../utilities/utilities.general.js');

module.exports = function(req, res, io) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    var GET_params = utilities_general.GET_params(req);

    return db.insert('messages', [{
            message: GET_params.message
        }])
        .then(function(result) {
            console.log('inserted');

            return db.find('messages', [{}])            
            .then(function(allmessages) {

                console.log('found all messages');

                io.emit('messages', {
                    message: GET_params.message
                });

                return respond.success(allmessages);
            });
        })
        .caught(function(err) {
            respond.failure('Could not list all users', err);
        });

};