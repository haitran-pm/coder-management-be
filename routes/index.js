var express = require("express");
var router = express.Router();
const { sendResponse } = require("../helpers/utils.js");

/* GET HomePage */
router.get("/", function (req, res, next) {
  sendResponse(res, 200, true, {}, null, "Welcome to CoderManagement.");
});

/* User API */
const userAPI = require("./user.api");
router.use("/users", userAPI);

/* Task API */
const taskAPI = require("./task.api");
router.use("/tasks", taskAPI);

module.exports = router;
