const express = require("express");
const { validateToken } = require("../../jwt");
const { handleLogin, handleSignout } = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/login", handleLogin);
authRouter.post("/signout", handleSignout);
authRouter.get("/profile", validateToken, handleSignout);

module.exports = authRouter;
