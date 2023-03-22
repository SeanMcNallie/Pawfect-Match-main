const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['dog', 'cat', 'bird', 'reptile', 'rabbit', 'rodent', 'fish', 'other'],
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large', 'extra-large'],
    required: true,
  },
  petdescription: {
    type: String,
    required: "What is the pets description?",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  petAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Pet = model("Pet", petSchema);

module.exports = Pet;
