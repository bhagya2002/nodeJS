const mongoose = require("mongoose"); // we're using a modelled schema

const Dishes = require("./models/dishes"); // get the Dishes Schema

const url = "mongodb://localhost:27017/conFusion"; // connect to the database
const connect = mongoose.connect(url); // connect to the database

// after the connection is established w/ param of "db"
connect.then((db) => {
  console.log("Connected correctly to server");

  // creates a new document
  Dishes.create({
    name: "Uthapizza2",
    description: "test",
  })
    // newDish.save() // save the new dish to the database
    .then((dish) => {
      console.log(dish);

      return Dishes.findByIdAndUpdate(
        dish._id,
        {
          $set: { description: "Updated Test" },
        },
        {
          new: true, // return the updated document
        }
      ).exec(); // return the updated dish after updated
    })
    .then((dish) => {
      console.log(dish);

      // add comment to the comments column in the table
      dish.comments.push({
        rating: 5,
        comment: "I'm getting a sinking feeling!",
        author: "Leonardo di Carpaccio",
      });

      return dish.save(); // save the updated dish to the database
    })
    .then((dish) => {
      console.log(dish);

      return Dishes.remove({}); // delete all the dishes from DB
    })
    .then(() => {
      return mongoose.connection.close(); // close the connection to the DB
    })
    .catch((err) => {
      console.log(err);
    });
});
