var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv/config");
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;
var indexRouter = require("./routes/index");
const { sendResponse, AppError } = require("./helpers/utils.js");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
  .connect(mongoURI)
  .then(() => console.log(`Database connected at ${mongoURI}`))
  .catch((err) => console.log(err));

app.use("/", indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new AppError(404, "Resource not found");
  next(err);
});

/* Initialize error handling */
app.use((err, req, res, next) => {
  console.log("ERROR", err);
  return sendResponse(
    res,
    err.statusCode ? err.statusCode : 500,
    false,
    null,
    { message: err.message },
    err.isOperational ? err.errorType : "Internal Server Error"
  );
});

module.exports = app;
