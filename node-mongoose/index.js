const mongoose = require("mongoose"); // we're using a modelled schema

const Dishes = require("./models/dishes"); // get the Dishes Schema

const url = "mongodb://localhost:27017/conFusion"; // connect to the database
const connect = mongoose.connect(url); // connect to the database

// after the connection is established w/ param of "db"
connect.then((db) => {
  console.log("Connected correctly to server");

  var newDish = Dishes({
    name: "Uthapizza",
    description: "test",
  });

  newDish
    .save() // save the new dish to the database
    .then((dish) => {
      console.log(dish);

      return Dishes.find({}); // return the promise (all the dishes)
    })
    .then((dishes) => {
      console.log(dishes);

      return Dishes.remove({}); // delete all the dishes from DB
    })
    .then(() => {
      return mongoose.connection.close(); // close the connection to the DB
    })
    .catch((err) => {
      console.log(err);
    });
});
