// import mongoose to create the Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema; // instantiate a Schema

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // will need this
      unique: true, // cannot be the same as any other rows
    },
    description: {
      type: String,
      required: true,
    },
  },
  //   automatically add createdAt and updatedAt fields
  {
    timestamps: true,
  }
);

// make the model with the schema named "DishSchema"
var Dishes = mongoose.model("Dish", dishSchema);

module.exports = Dishes; // can use the model globally now
