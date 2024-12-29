const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  getUserTasks,
  editUser,
  deleteUser,
} = require("../controllers/user.controller");
const router = express.Router();
const validateSchema = require("../middleware/validateSchema");
const { userValidationSchema } = require("../middleware/validationSchemas");

/**
 * @route POST /users
 * @description Create a new user
 * @access Private (manager role required)
 * @requiredBody
 * - name: string (required)
 */
router.post("/", validateSchema(userValidationSchema), createUser);

/**
 * @route GET /users
 * @description Get a list of users
 * @access Public
 * @allowedQueries
 * - name: string
 */
router.get("/", getUsers);

/**
 * @route GET /users/:userId
 * @description Get user by id
 * @access Public
 */
router.get("/:userId", getUserById);

/**
 * @route GET /users/:userId/tasks
 * @description Get user's tasks
 * @access Public
 */
router.get("/:userId/tasks", getUserTasks);

/**
 * @route PUT /users/:userId
 * @description Edit user
 * @access Private (manager role required)
 * @requiredBody
 * - name: string (optional)
 * - role: tring (optional)
 */
router.put("/:userId", editUser);

/**
 * @route DELETE /users/:userId
 * @description Delete user
 * @access Private (manager role required)
 */
router.delete("/:userId", deleteUser);

module.exports = router;
