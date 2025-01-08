const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../../helpers/utils");
const Task = require("../../models/Task");

const createTask = async (req, res, next) => {
  try {
    const newTask = req.body;
    // Tạo task mới
    const created = await Task.create(newTask);
    // Gửi kết quả
    sendResponse(res, 201, true, created, null, "Task created successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = createTask;
