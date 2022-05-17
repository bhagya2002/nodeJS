// connect to the mongodb
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert"); // check true or false
const dboper = require("./operations-callback_hell");

const url = "mongodb://localhost:27017"; // where server can be accessed
const dbname = "conFusion"; // database name

// connect to the mongodb at the URL
MongoClient.connect(url)
  // connect to the mongo client then execute the rest
  .then((client) => {
    assert.equal(err, null); // check if there is an error

    console.log("Connected correctly to server");

    //   what we want to access
    const db = client.db(dbname); // get the database

    //   insert a document in the db with the following attributes
    dboper
      .insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes")
      .then((result) => {
        console.log("Insert Document:\n", result.ops);

        //  find all the documents in the db
        return dboper.findDocuments(db, "dishes");
      })
      .then((docs) => {
        console.log("Found Documents:\n", docs);

        // update the document in the db with the following attributes
        return dboper.updateDocument(
          db,
          { name: "Vadonut" },
          { description: "Updated Test" },
          "dishes"
        );
      })
      .then((result) => {
        console.log("Updated Document:\n", result.result);

        // find all the documents in the db
        return dboper.findDocuments(db, "dishes");
      })
      .then((docs) => {
        console.log("Found Documents:\n", docs);

        // "delete" the collections in the database "dishes"
        return db.dropCollection("dishes");
      })
      .then((result) => {
        console.log("Dropped Collection: ", result);

        client.close();
      })
      .catch((err) => console.log(err));
  })
  //   if cannot connec to the mongo
  .catch((err) => console.log(err));
