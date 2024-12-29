const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../helpers/utils.js");
const User = require("../models/User");
const Task = require("../models/Task");
const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    // Kiểm tra nếu body rỗng
    if (!newUser) throw new AppError(400, "Bad Request", "Create user error");
    // Kiểm tra các key cho phép create user
    const allowedKeys = ["name", "role"];
    const createKeys = Object.keys(newUser);
    const isValidKeys = createKeys.every((key) => allowedKeys.includes(key));
    if (!isValidKeys) {
      throw new AppError(400, "Bad Request", "Invalid fields in create");
    }
    // Tạo user mới
    const created = await User.create(newUser);
    // Gửi trả kết quả
    sendResponse(res, 201, true, created, null, "User created successfully");
  } catch (err) {
    next(err);
  }
};

userController.getUsers = async (req, res, next) => {
  try {
    // Tính toán phân trang
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    // Lấy các tham số tìm kiếm từ query
    const { name, role } = req.query;
    const filter = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (role) filter.role = role;
    // Tìm toàn bộ user
    const listOfFound = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    // Gửi kết quả
    sendResponse(res, 200, true, listOfFound, null, null);
  } catch (err) {
    next(err);
  }
};

userController.getUserById = async (req, res, next) => {
  try {
    // Kiểm tra objectId
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError(400, "Bad Request", "Invalid user ID");
    }
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

userController.getUserTasks = async (req, res, next) => {
  try {
    // Kiểm tra objectId
    const { userId } = req.params;
    console.log(userId);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError(400, "Bad Request", "Invalid user ID");
    }
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

userController.editUser = async (req, res, next) => {
  try {
    // Kiểm tra objectId
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError(400, "Bad Request", "Invalid user ID");
    }
    // Kiểm tra các key cho phép update
    const updates = req.body;
    const allowedUpdates = ["name", "role"];
    const updateKeys = Object.keys(updates);
    const isValidUpdate = updateKeys.every((key) =>
      allowedUpdates.includes(key)
    );
    if (!isValidUpdate) {
      throw new AppError(400, "Bad Request", "Invalid fields in update");
    }
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

userController.deleteUser = async (req, res, next) => {
  try {
    // Kiểm tra objectId
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError(400, "Bad Request", "Invalid user ID");
    }
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

module.exports = userController;
