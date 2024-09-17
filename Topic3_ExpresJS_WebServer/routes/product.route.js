const express = require("express");
const {json} = require("body-parser");

const productRouter = express.Router(); // productRouter: mini Express
productRouter.use(json());

// Tien hanh dinh tuyen cac requests theo cac methods khac nhau
productRouter.route("/")
    .all((req, res, next) =>{
        res.statusCode = 200;
        next();
    })
    .get((req, res, next) => {
            res.send("Get method - Response success");
    })
    .post((req, res, next) => {
            res.status(200).json({"name": req.body.name});
    });

module.exports = productRouter;