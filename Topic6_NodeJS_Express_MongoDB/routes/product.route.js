const express = require("express");
const db = require("../models");

const productRouter = express.Router();

// Create new Product
productRouter.post("/create", async(req, res, next) => {
    try {
        await db.Products.create(req.body)
            .then(newDocs => {
                res.status(201).json(newDocs);   
            });
    } catch (error) {
        next(error);
    }
});

// List products: Related data
productRouter.get("/get-all", async(req, res, next) => {
    try {
        const products = await db.Products.find({}).populate("category").exec();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
})


module.exports = productRouter;