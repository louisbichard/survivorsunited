var mongo = require('mongodb');
var database = 'test' || process.env.DATABASE;
var respond = require('../utilities/utilities.respond.js');
var Promise = require('bluebird');
var _ = require('lodash');
var MongoClient = Promise.promisifyAll(require("mongodb"))
    .MongoClient;

if (!database) {
    throw new Error('Database environment variable is undefined!');
}

var api_methods = ['update', 'delete', 'find'];

var mongo_commands = _.reduce(api_methods, function(commands, command) {
    commands[command] = function(collection_name, query) {
        if (!collection_name) throw new Error('No collection specifed to ' + command + ' command');
        if (!query) throw new Error('No query supplied to ' + command + ' command');
        if (!_.isArray(query)) throw new Error('Must provide query as an array');
        return MongoClient.connectAsync(utilities.connection)
            .then(function(mongo) {
                // TODO: REFACTOR
                var collection_connect = Promise.promisifyAll(mongo.collection(collection_name));
                var result = collection_connect[command + 'Async']({});
                if (command === 'find') {
                    result = result.then(function(data) {
                        return data.toArrayAsync();
                    });
                }
                return result;
            });
    };
    return commands;
}, {});

var utilities = {
    connection: "mongodb://127.0.0.1:27017/" + database,
    getObjectID: function(id) {
        return new mongo.BSONPure.ObjectID(id);
    },
    formatData: function(result) {
        var find = Promise.promisifyAll(result);
        return find.toArrayAsync()
            .then(function(tasks) {
                return tasks;
            });
    }
};

module.exports = _.extend(utilities, mongo_commands);