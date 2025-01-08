const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../../helpers/utils");
const Task = require("../../models/Task");

const getTaskById = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    // Tìm task theo ID
    const task = await Task.findById(taskId);
    if (!task) {
      throw new AppError(404, "Task Not Found", "Get task by ID error");
    }
    // Gửi kết quả
    sendResponse(res, 200, true, task, null, null);
  } catch (err) {
    next(err);
  }
};

module.exports = getTaskById;
