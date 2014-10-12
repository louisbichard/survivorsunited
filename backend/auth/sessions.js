//SESSIONS API

//REQUIRED LIBRARIES
//------------------
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _ = require('lodash');
var getUserById = require('../users/getUserById.js')


module.exports = {
    /**
     * Adds a session for when an client first hits the server
     * @param {Object} args -
     */
    setCookieSession: function(cookie_value) {
        return fs.readFileAsync('./database/sessions.json', 'utf-8')
            .then(function(current_session_db) {

                current_session_db = JSON.parse(current_session_db);

                current_session_db.push({
                    session_id: cookie_value
                });


                return fs.writeFileAsync('./database/sessions.json', JSON.stringify(current_session_db));
            });
    },
    /** 
     * [addSession - assigns a user to an anonymous session
     * @param {String} user_id
     * @param {String} session_id
     */
    addSession: function(user_id, session_id) {
        return fs.readFileAsync('./database/sessions.json', 'utf-8')
            .then(function(current_session_db) {

                current_session_db = JSON.parse(current_session_db)

                // FIND IF ID IN DB
                _.each(current_session_db, function(curr_session, index) {
                    //Assign the user id to the session
                    if (curr_session.session_id = session_id) {
                        current_session_db[index].user_id = user_id;
                    }
                });

                // CONVERT BACK TO STRING AND STORE
                return fs.writeFileAsync('./database/sessions.json', JSON.stringify(current_session_db));
            });
    },

    /** 
     * [addSession - assigns a user to an anonymous session
     * @param {String} session_id
     */
    terminateSession: function(session_id) {
        // **TODO:** unassigns a user from a session based on session ID
    },
    
    /**
     * [isAuthenticated]
     * @param  {String}  - Session ID
     * @return {Object} {success: Boolean, isAuthenticated: Boolean}
     */
    isAuthenticated: function(session_id) {
        return fs.readFileAsync('./database/sessions.json', 'utf-8')
            .then(function(current_session_db) {
                current_session_db = JSON.parse(current_session_db)

                //FIND THE SESSION
                //CHECK IF AUTHENTICATED
                return _.reduce(current_session_db, function(prev, curr_session) {
                    if (curr_session.session_id === session_id) {
                        prev.isAuthenticated = true;
                        prev.user_id = curr_session.user_id;
                    };
                    return prev;
                }, {
                    success: true,
                    isAuthenticated: false
                });

            });
    }
};