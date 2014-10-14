// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/su", function(err, db) {
    if (!err) {
        console.log("We are connected");
    }
    var collection = db.collection('users');
    
    collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
    });
    
});