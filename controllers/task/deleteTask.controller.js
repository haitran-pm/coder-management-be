const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../../helpers/utils");
const Task = require("../../models/Task");

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    // Tìm và xóa mềm
    const deletedTask = await Task.findByIdAndUpdate(
      taskId,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedTask) {
      throw new AppError(404, "Task Not Found", "Delete task by ID error");
    }
    // Gửi kết quả
    sendResponse(res, 200, true, null, null, "Task deleted successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = deleteTask;
