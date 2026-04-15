require("dotenv").config();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

const password = process.env.DB_PASSWORD;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://myUser:${password}@cluster0.9j3dhlx.mongodb.net/?appName=Cluster0`,
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw "No found database!";
};

module.exports = { mongoConnect, getDb };
