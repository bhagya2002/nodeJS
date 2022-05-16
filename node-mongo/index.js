// connect to the mongodb
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert"); // check true or false
const dboper = require("./operations");

const url = "mongodb://localhost:27017"; // where server can be accessed
const dbname = "conFusion"; // database name

// connect to the mongodb at the URL
MongoClient.connect(url, (err, client) => {
  assert.equal(err, null); // check if there is an error

  console.log("Connected correctly to server");

  //   what we want to access
  const db = client.db(dbname); // get the database

    //   insert a document
    dboper.insertDocument(db, { name: "Vadonut", description: "Test" },
        "dishes", (result) => {
            
});