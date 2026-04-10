require("dotenv").config();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const password = process.env.DB_PASSWORD;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://myUser:${password}@cluster0.9j3dhlx.mongodb.net/?appName=Cluster0`,
  )
    .then((client) => {
      console.log("Connected!");
      callback(client);
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = mongoConnect;
