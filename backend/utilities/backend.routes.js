//REQUIRED LIBRARIES
//------------------
var colors = require('colors');
var uuid = require('node-uuid');
var _ = require('lodash');
var log = require('../utilities/logger.js');

var apiFile = function(req, res, next, location) {
    log.general('Enpoint: ', location.blue);
    if (!location || !_.isString(location)) {
        throw new Error('location was not found, or incorrect type when passed to apiFile in backend routes');
    }
    return require(location)(req, res);
};

//API ENDPOINTS
//=============

module.exports = function(app) {

    //AUTHENTICATION
    app.post('/auth/login', _.partialRight(apiFile, './../auth/auth.login.js'));
    app.get('/auth/logout', _.partialRight(apiFile, './../auth/auth.logout.js'));
    app.get('/auth/isauthenticated', _.partialRight(apiFile, './../auth/auth.isAuthenticated'));

    //SESSIONS
    app.get('/sessions/listall', _.partialRight(apiFile, './../sessions/sessions.listall.js'));

    //USER
    app.get('/user/current', _.partialRight(apiFile, './../users/user.current.js'));
    app.get('/users/listall', _.partialRight(apiFile, './../users/users.listall.js'));
    app.post('/user/update', _.partialRight(apiFile, './../users/user.update.js'));
    app.post('/user/add', _.partialRight(apiFile, '../users/user.add.js'));
    app.post('/user/delete', _.partialRight(apiFile, '../users/user.delete.js'));

    //MENTOR
    app.get('/user/assigned_mentor', _.partialRight(apiFile, './../users/user.assigned_mentor.js'));
    app.post('/user/assign_mentor', _.partialRight(apiFile, './../users/user.assign_mentor.js'));

    //EVENTS
    app.get('/events/listall', _.partialRight(apiFile, './../events/events.listall.js'));
    app.get('/events/listWatchersOrAttendees', _.partialRight(apiFile, './../events/events.listWatchersOrAttendees.js'));
    app.post('/events/add', _.partialRight(apiFile, './../events/events.add.js'));
    app.get('/events/watching/current', _.partialRight(apiFile, './../events/events.current.watching.js'));
    app.post('/events/watchOrAttend', _.partialRight(apiFile, './../events/events.current.watchOrAttend.js'));
    app.post('/events/subscribe', _.partialRight(apiFile, './../events.current.subscribe.js'));

    //ADMIN
    app.get('/testresults', _.partialRight(apiFile, './../admin/test.results.js'));
};