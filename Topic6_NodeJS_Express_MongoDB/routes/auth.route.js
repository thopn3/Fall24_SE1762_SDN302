const express = require("express");
const bodyParser = require("body-parser");
const {AuthController} = require("../controllers");

const authRouter = express.Router();
authRouter.use(bodyParser.json());

// POST: /sign-up
authRouter.post("/sign-up", AuthController.signUp);

// POST: /sign-in
authRouter.post("/sign-in", AuthController.signIn);

module.exports = authRouter;