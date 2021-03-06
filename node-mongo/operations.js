const assert = require("assert"); // check true or false

// the db name, what document to be inserted, the table name, and the callback
exports.insertDocument = (db, document, collection, callback) => {
  //   find the collection
  const coll = db.collection(collection);
  return coll.insert(document);
};

// the db name, the table name, and the callback
exports.findDocuments = (db, collection, callback) => {
  //   find the collection
  const coll = db.collection(collection);
  //   find the documents and put them in an array
  return coll.find({}).toArray();
};

// the db name, the document, the table name, and the callback
exports.removeDocument = (db, document, collection, callback) => {
  //   find the collection
  const coll = db.collection(collection);

  //   remove the document
  return coll.deleteOne(document);
};

// the db name, the document, the table name, and the callback
exports.updateDocument = (db, document, update, collection, callback) => {
  //   find the collection
  const coll = db.collection(collection);

  //   update the document
  return coll.updateOne(document, { $set: update }, null);
};
