const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const httpErrors = require("http-errors");
require("dotenv").config();

const db = require("./models");
const { CategoryRouter, ProductRouter, AuthRouter } = require("./routes");

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", async (req, res, next) => {
    res.status(200).json({ message: "Welcome to RESTFul API - NodeJS" });
});

// Dinh tuyen theo cac chuc nang thuc te
app.use("/category", CategoryRouter);
app.use("/product", ProductRouter);
app.use("/auth", AuthRouter);

app.use(async (req, res, next) => {
    next(httpErrors.BadRequest("Bad request"));
});

app.use(async (err, req, res, next) => {
    res.status = err.status || 500;
    res.send({
        "error": {
            "status": err.status || 500,
            "message": err.message
        }
    });
})

const HOST = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || 9999;

app.listen(PORT, HOST, () => {
    console.log(`Server running at: http://${HOST}:${PORT}`);
    // Thuc thi ket noi CSDL
    db.connectDB();
});