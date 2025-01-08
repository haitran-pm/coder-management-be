const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../../helpers/utils.js");
const User = require("../../models/User");

const createUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    // Tạo user mới
    const created = await User.create(newUser);
    // Gửi trả kết quả
    sendResponse(res, 201, true, created, null, "User created successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = createUser;
