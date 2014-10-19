var mongo = require('mongodb');

module.exports = {
    connection: "mongodb://127.0.0.1:27017/su",
    getObjectID: function(id) {
        return new mongo.BSONPure.ObjectID(id);
    }

};
