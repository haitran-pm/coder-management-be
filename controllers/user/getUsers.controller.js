const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../../helpers/utils.js");
const User = require("../../models/User");

const getUsers = async (req, res, next) => {
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

module.exports = getUsers;
