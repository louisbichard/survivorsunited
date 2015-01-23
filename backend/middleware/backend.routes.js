//REQUIRED LIBRARIES
//------------------
var colors = require('colors');
var uuid = require('node-uuid');
var _ = require('lodash');
var log = require('../utilities/logger.js');

var runEndpoint = function(req, res, next, location, io) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    // REMOVE THE LEADING SLASHES FROM THE LOCATION PATH FOR MORE READABLE API OUTPUT
    log.general('EP: ', location.blue);

    if (!location || !_.isString(location)) {
        throw new Error('location was not found, or incorrect type when passed to(runEndpoint in backend routes');
    }

    // CALL API
    try {
        return require(location)(req, res, io);
    } catch (err) {
        log.debug(err);
        require('./log.server.error.js')(req, res, {
                location: location,
                anonymous: !req.user,
                err: JSON.stringify(err)
            })
            .then(function() {
                respond.failure('Internal API failure');
            })
            .caught(function() {
                respond.failure('Internal API failure');
            });
    }
};

//API ENDPOINTS
module.exports = function(app, io) {

    //AUTHENTICATION
    app.post('/auth/login', _.partialRight(runEndpoint, './../auth/auth.login.js'));
    app.get('/auth/logout', _.partialRight(runEndpoint, './../auth/auth.logout.js'));
    app.get('/auth/isauthenticated', _.partialRight(runEndpoint, './../auth/auth.isAuthenticated'));

    //SESSIONS
    app.get('/sessions/listall', _.partialRight(runEndpoint, './../sessions/sessions.listall.js'));

    //USER
    app.get('/user/current', _.partialRight(runEndpoint, './../users/user.current.js'));
    app.get('/users/listall', _.partialRight(runEndpoint, './../users/users.listall.js'));
    app.post('/user/update', _.partialRight(runEndpoint, './../users/user.update.js'));
    app.post('/user/add', _.partialRight(runEndpoint, '../users/user.add.js'));
    app.post('/user/delete', _.partialRight(runEndpoint, '../users/user.delete.js'));

    //REFERRAL
    app.post('/referrals/insert', _.partialRight(runEndpoint, './../referrals/referrals.insert.js'));
    app.get('/referrals/listall', _.partialRight(runEndpoint, './../referrals/referrals.listall.js'));

    //SEARCH
    app.get('/search', _.partialRight(runEndpoint, './../search/search.js'));

    //CHAT
    app.post('/chat', _.partialRight(runEndpoint, './../chat/chat.js', io));

    //TASKS
    app.post('/task/add', _.partialRight(runEndpoint, './../tasks/task.add.js'));
    app.get('/tasks/listall', _.partialRight(runEndpoint, './../tasks/tasks.listall.js'));
    app.get('/tasks/assigned', _.partialRight(runEndpoint, './../tasks/tasks.assigned.js'));
    app.post('/task/update', _.partialRight(runEndpoint, './../tasks/task.update.js'));

    //MENTOR
    app.get('/user/assigned_mentees', _.partialRight(runEndpoint, './../users/user.assigned_mentees.js'));
    app.get('/user/assigned_mentor', _.partialRight(runEndpoint, './../users/user.assigned_mentor.js'));
    app.post('/user/assign_mentor', _.partialRight(runEndpoint, './../users/user.assign_mentor.js'));

    //EVENTS
    app.get('/events/listall', _.partialRight(runEndpoint, './../events/events.listall.js'));
    app.get('/events/listWatchersOrAttendees', _.partialRight(runEndpoint, './../events/events.listWatchersOrAttendees.js'));
    app.post('/events/add', _.partialRight(runEndpoint, './../events/events.add.js'));
    app.get('/events/watching/current', _.partialRight(runEndpoint, './../events/events.current.watching.js'));
    app.post('/events/watchOrAttend', _.partialRight(runEndpoint, './../events/events.current.watchOrAttend.js'));
    app.post('/events/subscribe', _.partialRight(runEndpoint, './../events.current.subscribe.js'));
    app.get('/events/removeWatchOrAttend', _.partialRight(runEndpoint, './../events/events.removeWatchOrAttend.js'));

    //ADMIN
    app.get('/testbackend', _.partialRight(runEndpoint, './../admin/test.backend.results.js'));
    app.get('/testfrontend', _.partialRight(runEndpoint, './../admin/test.frontend.results.js'));
    app.get('/backenderrors', _.partialRight(runEndpoint, './../admin/backend.error.log.js'));
    app.get('/codecomplexity', _.partialRight(runEndpoint, './../admin/codecomplexity.js'));
};