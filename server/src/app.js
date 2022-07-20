const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth/auth.router");
const signUpRouter = require("./routes/signup/signup.router");
const otpRouter = require("./routes/otp/otp.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use(authRouter);
app.use(signUpRouter);
app.use(otpRouter);

module.exports = app;
