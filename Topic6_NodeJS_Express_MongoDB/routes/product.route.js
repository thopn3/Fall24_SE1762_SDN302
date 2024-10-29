const express = require("express");
const db = require("../models");
const bodyParser = require("body-parser");
const VerifyAuth = require("../middlewares/verifyAuth");

const productRouter = express.Router();
// Kiểm soát loại request tới router này
productRouter.use(bodyParser.json());
productRouter.use((req, res, next) => {
    req.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Create new Product
productRouter.post("/create", [VerifyAuth.verifyToken, VerifyAuth.isManager], async(req, res, next) => {
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
productRouter.get("/get-all", [VerifyAuth.verifyToken, VerifyAuth.isMember] ,async(req, res, next) => {
    try {
        const products = await db.Products.find({}).populate("category").exec();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
})


module.exports = productRouter;