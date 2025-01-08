const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../../helpers/utils.js");
const User = require("../../models/User");

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    // Tìm user theo ID
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User Not Found", "Get user by ID error");
    }
    // Gửi kết quả
    sendResponse(res, 200, true, user, null, null);
  } catch (err) {
    next(err);
  }
};

module.exports = getUserById;
