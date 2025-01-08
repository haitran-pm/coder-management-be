const express = require("express");
const router = express.Router();
const createTask = require("../controllers/task/createTask.controller");
const getTasks = require("../controllers/task/getTasks.controller");
const getTaskById = require("../controllers/task/getTaskById.controller");
const editTask = require("../controllers/task/editTask.controller");
const deleteTask = require("../controllers/task/deleteTask.controller");
const validateSchema = require("../middleware/validateSchema");
const { createTaskBodySchema } = require("../schemas/task/createTask.schema");
const { getTasksQuerySchema } = require("../schemas/task/getTasks.schema");
const {
  getTaskByIdParamsSchema,
} = require("../schemas/task/getTaskById.schema");
const {
  editTaskParamsSchema,
  editTaskBodySchema,
} = require("../schemas/task/editTask.schema");
const { deleteTaskParamsSchema } = require("../schemas/task/deleteTask.schema");

/**
 * @route POST /tasks
 * @description Create a new task
 * @access Public
 * @requiredBody
 * - name: string (required)
 * - description: string (required)
 * - status: string (optional)
 * - user: ObjectId (optional)
 */
router.post("/", validateSchema({ body: createTaskBodySchema }), createTask); // body

/**
 * @route GET /tasks
 * @description Get a list of tasks
 * @access Public
 * @allowedQueries
 * - name: string (optional)
 * - description: string (optional)
 * - status: string (optional)
 * - user: ObjectId (optional)
 * - page: number (optional)
 * - limit: number (optional)
 */
router.get("/", validateSchema({ query: getTasksQuerySchema }), getTasks); // query

/**
 * @route GET /tasks/:taskId
 * @description Get task by id
 * @access Public
 */
router.get(
  "/:taskId",
  validateSchema({ params: getTaskByIdParamsSchema }),
  getTaskById
); // params

/**
 * @route PATCH /tasks/:taskId
 * @description Edit task
 * @access Public
 * @requiredBody
 * - name: string (optional)
 * - description: string (optional)
 * - status: string (optional)
 * - user: ObjectId (optional)
 */
router.patch(
  "/:taskId",
  validateSchema({ params: editTaskParamsSchema, body: editTaskBodySchema }),
  editTask
); // params; body

/**
 * @route DELETE /tasks/:taskId
 * @description Delete task
 * @access Public
 */
router.delete(
  "/:taskId",
  validateSchema({ params: deleteTaskParamsSchema }),
  deleteTask
); // params

module.exports = router;
