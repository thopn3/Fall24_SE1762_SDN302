const express = require("express");
const bodyParser = require("body-parser");
const Category = require("../models/category.model");
const {CategoryController} = require("../controllers");

const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());

// Create a new category
categoryRouter.post("/create", async (req, res, next) => {
    try {
        // Lay du lieu tu request (client)
        const newCategory = new Category(req.body);
        await newCategory.save().then(newDoc => {
            res.status(201).json({
                message: "Insert successfully",
                result: {
                    catId: newDoc._id,
                    catName: newDoc.name,
                    desc: newDoc.description
                }
            });
        });
    } catch (error) {
        next(error);
    }
});

categoryRouter.get("/get-all", CategoryController.getAll);

module.exports = categoryRouter;