const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        validate: {
            validator: function(v){
                return v.length > 3
            },
            message: "Length of name must be greater than 3 characters"
        },
        unique: [true, "Category name is duplicate"]
    },
    description: String
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;