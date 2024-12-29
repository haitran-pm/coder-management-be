const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  editTask,
  deleteTask,
} = require("../controllers/task.controller");
const router = express.Router();
const validateSchema = require("../middleware/validateSchema");
const { taskValidationSchema } = require("../middleware/validationSchemas");

/**
 * @route POST /tasks
 * @description Create a new task
 * @access Public
 * @requiredBody
 * - name: string
 * - description: string (required)
 */
router.post("/", validateSchema(taskValidationSchema), createTask);

/**
 * @route GET /tasks
 * @description Get a list of tasks
 * @access Public
 * @allowedQueries
 * - name: string
 * - status: string
 */
router.get("/", getTasks);

/**
 * @route GET /tasks/:taskId
 * @description Get task by id
 * @access Public
 */
router.get("/:taskId", getTaskById);

/**
 * @route PUT /tasks/:taskId
 * @description Edit task
 * @access Public
 * @requiredBody
 * - name: string (optional)
 * - description: string (optional)
 * - status: string (optional)
 * - user: ObjectId (optional)
 */
router.put("/:taskId", editTask);

/**
 * @route DELETE /tasks/:taskId
 * @description Delete user
 * @access Public
 */
router.delete("/:taskId", deleteTask);

module.exports = router;
