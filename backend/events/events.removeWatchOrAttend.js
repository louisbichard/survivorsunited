var db = require('../utilities/database.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    try {
        console.log(req.GET);
        req.GET.event_id = db.getObjectID(req.GET.event_id);

    } catch (err) {
        respond.failure('ID is invalid');
    }

    // VALIDATION
    if (!req.GET.event_id || !req.GET.type)
        respond.failure('Insufficient parameters passed');
    else {
        var pull = {};

        pull[req.GET.type] = req.user._id;

        return db.update('events', [{
                _id: req.GET.event_id,
            }, {
                $pull: pull
            }])
            .then(function(message) {
                return respond.success("Successfully removed attendance");
            });
        /*.caught(function(){
            // TODO
        })*/

    }

};