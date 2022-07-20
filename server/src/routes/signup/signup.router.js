const express = require("express");
const { handleSignUp } = require("./signup.controller");

const signUpRouter = express.Router();

signUpRouter.post("/signup", handleSignUp);

module.exports = signUpRouter;
