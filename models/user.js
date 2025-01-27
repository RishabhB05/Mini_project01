const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/miniproject");

// Define the schema for the User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures that the name is provided
  },
  username: {
    type: String,
    required: true, // Ensures that the username is provided
    unique: true, // Ensures the username is unique
  },
  password: {
    type: String,
    required: true, // Ensures that the password is provided
  },
  age: {
    type: Number,
    required: true, // Ensures that the age is provided
  },
  email: {
    type: Number,
    required: true, // Ensures that the age is provided
  },

  post: [{type:mongoose.Schema.Types.ObjectId , ref:"post"}],
  
});

// Create the model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
