const { MongoClient } = require("mongodb");
require('dotenv').config();
const url = process.env.MONGODB_URI;

//const url = "mongodb+srv://pnwadaptedtechlib:nSuSRjMtxVlg7Bsh@assistivetech.rqfvd7e.mongodb.net/test";
const client = new MongoClient(url, {useUnifiedTopology: true});

const connection = client.connect();

var methods = {
    queryDb: function (query, callback) {
        console.log("entered queryDb")
        connection.then(() => {
            return client
                .db("AdaptiveTechLib")
                .collection("Products")
                .find(query)
                .toArray(function (err, result) {
                if (err) throw err;
                return callback(result);
            });
        });
    },

    getTags: function (query, callback) {
        console.log("entered getTags")
        connection.then(() => {
            return client
                .db("AdaptiveTechLib")
                .collection("Tags")
                .find(query)
                .toArray(function (err, result) {
                    if (err) throw err;
                    return callback(result);
            });
        });
    },

    checkUserExists: function (query, callback) {
        console.log("entered checkUserExists")
        connection.then(() => {
            var dbo = client.db("AdaptiveTechLib");
            return dbo.collection("Users").count(query, function (err, result) {
                if (err) throw err;
                return callback(result);
            });
        });
    },

    registerUser: function (query, callback) {
        console.log("entered registerUser");
        console.log(query);
        try {
            connection.then(() => {
                return client
                .db("AdaptiveTechLib")
                .collection("Users")
                .insertOne(query)
            });
        } catch {
            return callback(result);
        }
        
    },

    loginUser: function (query, callback) {
        console.log("entered loginUser")
        connection.then(() => {
            var dbo = client.db("AdaptiveTechLib");
            return dbo.collection("Users").count(query, function (err, result) {
                if (err) throw err;
                return callback(result);
            });
        });
    }, 

    insertField: function (pid, url) {
        connection.then(() => {
            var dbo = client.db("AdaptiveTechLib");
            dbo.collection('Products').updateOne(
                {ProductId: pid},
                {
                    $set: {EmbeddedLink: url}
                }
            )
            
        });
    },

    insertTags: function (username, tags) {
        connection.then(() => {
            var dbo = client.db("AdaptiveTechLib");
            dbo.collection('Users').updateOne(
                {username: username},
                {
                    $set: {'tags': tags}
                }
            )
        });
    },

    getDefaultTags: function (query, callback) {
        connection.then(function (err, db) {
            var dbo = client.db("AdaptiveTechLib");
            dbo.collection("Users").findOne(query, function (err, result) {
              if (err) throw err;
              return callback(result);
            });
        });
    },

}
module.exports = methods;