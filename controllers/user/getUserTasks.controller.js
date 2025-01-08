const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../../helpers/utils.js");
const User = require("../../models/User");
const Task = require("../../models/Task");

const getUserTasks = async (req, res, next) => {
  try {
    const { userId } = req.params;
    // Kiểm tra user có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User Not Found", "Get user by ID error");
    }
    // Lấy danh sách task của user
    const tasks = await Task.find({ user: userId }).sort({
      createdAt: -1,
    });
    // Gửi kết quả
    sendResponse(res, 200, true, tasks, null, null);
  } catch (err) {
    next(err);
  }
};

module.exports = getUserTasks;
