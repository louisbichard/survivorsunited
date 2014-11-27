var mongo = require('mongodb');
var database = process.env.DATABASE;
var Promise = require('bluebird');
var _ = require('lodash');

if (!database) {
    throw new Error('Database environment variable is undefined!');
}

// APPLY MONGO UPDATE, DELETE, ETC COMMANDS

var mongo_commands = _.reduce(['update', 'delete'], function(commands, command) {
    return commands[command] = function(collection, query) {
        if (!collection) throw new Error('No collection specifed to udpate command');
        if (!query) throw new Error('No query supplied to update command');
        if (!_.isArray(query)) throw new Error('Must provide query as an array');
        return this.collection(collection)[query + 'Async'].apply(query);
    }
}, {});

var utilities = {
    connection: "mongodb://127.0.0.1:27017/" + database,
    connect: function() {
        return this.mongo.connectAsync(this.connection);
    },
    getObjectID: function(id) {
        return new mongo.BSONPure.ObjectID(id);
    },
    formatData: function(result) {
        var find = Promise.promisifyAll(result);
        return find.toArrayAsync()
            .then(function(tasks) {
                return tasks;
            });
    },

    ensureDBRecords: function(result, respond, message, num) {
        if (!result) throw new Error('Must provide result param to ensureDBRecords function');

        num = num || 0;
        message = 'Could not find specified record';

        if (result[0] <= num) respond.failure(message);
        else return result;
    },

    // PROMISIFIED CONNECTION TO THE MONGO CLIENT
    mongo: Promise.promisifyAll(require("mongodb"))
        .MongoClient,

    // PROMISIFIED CONNECTION TO THE SPECIFIED COLLECTION NAME
    collection: function(collection_name) {
        if (!collection_name) throw new Error('Must provide collection name to database collection function');
        return Promise.promisifyAll(db.collection(collection_name));
    },
    update: function(collection, query) {
        if (!collection) throw new Error('No collection specifed to udpate command');
        if (!query) throw new Error('No query supplied to update command');
        if (!_.isArray(query)) throw new Error('Must provide query as an array');
        return this.collection(collection)[query + 'Async'].apply(query);
    }
};

module.exports = _.extend(utilities, mongo_commands);