const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../helpers/utils.js");
const Task = require("../models/Task");
const taskController = {};

taskController.createTask = async (req, res, next) => {
  try {
    const newTask = req.body;
    // Kiểm tra body rỗng
    if (!newTask) throw new AppError(400, "Bad Request", "Create task error");
    // Kiểm tra các key cho phép create task
    const allowedKeys = ["name", "description", "status", "user"];
    const createKeys = Object.keys(newTask);
    const isValidKeys = createKeys.every((key) => allowedKeys.includes(key));
    if (!isValidKeys) {
      throw new AppError(400, "Bad Request", "Invalid fields in create");
    }
    // Tạo task mới
    const created = await Task.create(newTask);
    // Gửi kết quả
    sendResponse(res, 201, true, created, null, "Task created successfully");
  } catch (err) {
    next(err);
  }
};

taskController.getTasks = async (req, res, next) => {
  try {
    // Tính toán phân trang
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    // Lấy các tham số tìm kiếm từ query
    const { name, description, status, user } = req.query;
    const filter = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (description)
      filter.description = { $regex: description, $options: "i" };
    if (status) filter.status = status;
    if (user) filter.user = user;
    // Tìm toàn bộ user
    const listOfFound = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    // Gửi kết quả
    sendResponse(res, 200, true, listOfFound, null, null);
  } catch (err) {
    next(err);
  }
};

taskController.getTaskById = async (req, res, next) => {
  try {
    // Kiểm tra objectId
    const { taskId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new AppError(400, "Bad Request", "Invalid task ID");
    }
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

taskController.editTask = async (req, res, next) => {
  try {
    // Kiểm tra objectId
    const { taskId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new AppError(400, "Bad Request", "Invalid task ID");
    }
    // Kiểm tra các key cho phép update
    const updates = req.body;
    const allowedUpdates = ["name", "description", "status", "user"];
    const updateKeys = Object.keys(updates);
    const isValidUpdate = updateKeys.every((key) =>
      allowedUpdates.includes(key)
    );
    if (!isValidUpdate) {
      throw new AppError(400, "Bad Request", "Invalid fields in update");
    }
    // Lấy task hiện tại từ database
    const task = await Task.findById(taskId);
    if (!task) {
      throw new AppError(404, "Task Not Found", "Update task by ID error");
    }
    // Logic xử lý status
    if (
      task.status === "done" &&
      updates.status &&
      updates.status !== "archive"
    ) {
      throw new AppError(
        400,
        "Bad Request",
        "Task with status done can't be changed to other value except archive"
      );
    }
    // Tìm và update, sau đó trả về object sau khi update
    const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, updates, {
      new: true,
    });
    if (!updatedTask) {
      throw new AppError(404, "Task Not Found", "Update task by ID error");
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      updatedTask,
      null,
      "Task updated successfully"
    );
  } catch (err) {
    next(err);
  }
};

taskController.deleteTask = async (req, res, next) => {
  try {
    // Kiểm tra objectId
    const { taskId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new AppError(400, "Bad Request", "Invalid task ID");
    }
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

module.exports = taskController;
