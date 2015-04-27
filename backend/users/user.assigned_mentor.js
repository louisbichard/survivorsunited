var db = require('../utilities/database.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    req.user = req.user || {};

    //VALIDATION: USER HAS NO MENTOR
    if (!req.user && !req.user.mentor) {
        respond.failure('No assigned mentor');
    }

    var mentor_id = req.user.mentor;

    try {
        if (mentor_id) mentor_id = db.getObjectID(mentor_id);
    } catch (e) {
        respond.failure('Mentor ID of incorrect format');
    }

    return db.find('users', [{_id: mentor_id }])
        .then(respond.success)
        .caught(function(err) {
            respond.failure('Could not find assigned mentor', err);
        });

};
