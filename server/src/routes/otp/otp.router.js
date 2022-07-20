const express = require("express");
const { handleOTP, validateOTP } = require("./otp.controller");

const otpRouter = express.Router();

otpRouter.post("/otp", handleOTP);
otpRouter.post("/validate-otp", validateOTP);

module.exports = otpRouter;
