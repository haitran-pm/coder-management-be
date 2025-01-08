const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../../helpers/utils.js");
const User = require("../../models/User");
const Task = require("../../models/Task");

const unassignTask = async (req, res, next) => {
  try {
    const { userId, taskId } = req.params;
    // Kiểm tra user và task có tồn tại không
    const [user, task] = await Promise.all([
      User.findById(userId),
      Task.findById(taskId),
    ]);
    if (!user) {
      throw new AppError(404, "User Not Found", "Get user by ID error");
    }
    if (!task) {
      throw new AppError(404, "Task Not Found", "Get task by ID error");
    }
    // Remove user from task
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: taskId },
      { $unset: { user: "" } },
      { new: true }
    );
    // Gửi kết quả
    sendResponse(
      res,
      201,
      true,
      updatedTask,
      null,
      "User unassigned successfully"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = unassignTask;
