const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../../helpers/utils");
const Task = require("../../models/Task");

const getTasks = async (req, res, next) => {
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

module.exports = getTasks;
