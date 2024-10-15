const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, "Category name is required"]
    },
    text: {
        type: String,
        max: [200, "Content max size 200 characters"]
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    }
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;