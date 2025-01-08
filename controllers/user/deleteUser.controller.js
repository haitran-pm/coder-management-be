const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../../helpers/utils.js");
const User = require("../../models/User");

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    // Tìm và xóa mềm
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedUser) {
      throw new AppError(404, "User Not Found", "Delete user by ID error");
    }
    // Gửi kết quả
    sendResponse(res, 200, true, null, null, "User deleted successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = deleteUser;
