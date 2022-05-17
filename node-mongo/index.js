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

  //   insert a document in the db with the following attributes
  dboper.insertDocument(
    db,
    { name: "Vadonut", description: "Test" },
    "dishes",
    (result) => {
      console.log("Insert Document:\n", result.ops);

      //  find all the documents in the db
      dboper.findDocuments(db, "dishes", (docs) => {
        console.log("Found Documents:\n", docs);

        // update the document in the db with the following attributes
        dboper.updateDocument(
          db,
          { name: "Vadonut" },
          { description: "Updated Test" },
          "dishes",
          (result) => {
            console.log("Updated Document:\n", result.result);

            // find all the documents in the db
            dboper.findDocuments(db, "dishes", (docs) => {
              console.log("Found Documents:\n", docs);

              // "delete" the collections in the database "dishes"
              db.dropCollection("dishes", (result) => {
                console.log("Dropped Collection: ", result);
              });
            });
          }
        );
      });
    }
  );
});
