const assert = require("assert");

// the db name, what document to be inserted, the table name, and the callback
exports.insertDocument = (db, document, collection, callback) => {
  //   find the collection
  const coll = db.collection(collection);
  coll.insert(document, (err, result) => {
    assert.equal(err, null); // ensure no errors
    // result.result.n; // number of documents inserted
    console.log(
      "Inserted " +
        result.result.n +
        " document into the collection " +
        collection
    );
    callback(result);
  });
};

// the db name, the table name, and the callback
exports.findDocuments = (db, collection, callback) => {
  //   find the collection
  const coll = db.collection(collection);
  //   find the documents and put them in an array
  coll.find({}).toArray((err, docs) => {
    assert.equal(err, null); // check if there is an error
    callback(docs);
  });
};

// the db name, the document, the table name, and the callback
exports.removeDocument = (db, document, collection, callback) => {
  //   find the collection
  const coll = db.collection(collection);

  //   remove the document
  coll.deleteOne(document, (err, result) => {
    assert.equal(err, null); // check if there is an error
    console.log("Removed the document ", document);
    callback(result);
  });
};

// the db name, the document, the table name, and the callback
exports.updateDocument = (db, document, update, collection, callback) => {
  //   find the collection
  const coll = db.collection(collection);

  //   update the document
  coll.updateOne(document, { $set: update }, null, (err, result) => {
    assert.equal(err, null); // check if there is an error
    console.log("Updated the document with ", update);
    callback(result);
  });
};
