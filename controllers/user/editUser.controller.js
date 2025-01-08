const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../../helpers/utils.js");
const User = require("../../models/User");

const editUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    // Tìm và update, sau đó trả về object sau khi update
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!updatedUser) {
      throw new AppError(404, "User Not Found", "Update user by ID error");
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      updatedUser,
      null,
      "User updated successfully"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = editUser;
