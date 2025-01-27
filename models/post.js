const mongoose = require('mongoose');

// Define the schema for the User
const postSchema =  mongoose.Schema({
  
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },

    date:{
      type:date,
      default:Date.now
    },

    content:String,

    likes: [
        {type:mongoose.Schema.Types.ObjectId, ref:"user"}

    ]

  
});

// Create the model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
