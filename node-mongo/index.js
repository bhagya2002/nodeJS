// connect to the mongodb
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert"); // check true or false

const url = "mongodb://localhost:27017"; // where server can be accessed
const dbname = "conFusion"; // database name

// connect to the mongodb at the URL
MongoClient.connect(url, (err, client) => {
  assert.equal(err, null); // check if there is an error

  console.log("Connected correctly to server");

  //   what we want to access
  const db = client.db(dbname); // get the database
  const collection = db.collection("dishes");

  //   add a document to the collection
  collection.insertOne(
    { name: "Trial Name", description: "Trial Description" },
    (err, result) => {
      assert.equal(err, null); // check if there is an error
      console.log("After Insert:\n");
      console.log(result.ops); // number of operations that took place

      //   find the # of records in the collection in the array of JSON objects
      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null); // check if there is an error
        console.log("Found:\n");
        console.log(docs); // return the collections with the same values

        // drop the specific collection (delete table in database)
        db.dropCollection("dishes", (err, result) => {
          assert.equal(err, null); // check if there is an error

          client.close();
        });
      });
    }
  );
});
