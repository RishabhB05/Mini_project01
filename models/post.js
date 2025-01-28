const mongoose = require('mongoose');

// Define the schema for the Post
const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // Referring to the 'User' model correctly
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: String,
    likes: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Referring to the 'User' model correctly
    ]
});

// Create the model based on the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
