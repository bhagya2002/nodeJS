// import mongoose to create the Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema; // instantiate a Schema

const commentSchema = new Schema(
  {
    // can set min and max bounds
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

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
    comments: [commentSchema], // calling another schema (commentSchema)
  },
  //   automatically add createdAt and updatedAt fields
  {
    timestamps: true,
  }
);

// make the model with the schema named "DishSchema"
var Dishes = mongoose.model("Dish", dishSchema);

module.exports = Dishes; // can use the model globally now
