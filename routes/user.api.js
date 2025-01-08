const express = require("express");
const router = express.Router();
const createUser = require("../controllers/user/createUser.controller");
const getUsers = require("../controllers/user/getUsers.controller");
const getUserById = require("../controllers/user/getUserById.controller");
const getUserTasks = require("../controllers/user/getUserTasks.controller");
const editUser = require("../controllers/user/editUser.controller");
const assignTask = require("../controllers/user/assignTask.controller");
const unassignTask = require("../controllers/user/unassignTask.controller");
const deleteUser = require("../controllers/user/deleteUser.controller");
const validateSchema = require("../middleware/validateSchema");

const { createUserBodySchema } = require("../schemas/user/createUser.schema");
const { getUsersQuerySchema } = require("../schemas/user/getUsers.schema");
const {
  getUserByIdParamsSchema,
} = require("../schemas/user/getUserById.schema");
const {
  getUserTasksParamsSchema,
  getUserTasksQuerySchema,
} = require("../schemas/user/getUserTasks.schema");
const {
  editUserParamsSchema,
  editUserBodySchema,
} = require("../schemas/user/editUser.schema");
const { assignTaskParamsSchema } = require("../schemas/user/assignTask.schema");
const {
  unassignTaskParamsSchema,
} = require("../schemas/user/unassignTask.schema");
const { deleteUserParamsSchema } = require("../schemas/user/deleteUser.schema");

/**
 * @route POST /users
 * @description Create a new user
 * @access Public
 * @requiredBody
 * - name: string (required)
 * - role: string (optional)
 */
router.post("/", validateSchema({ body: createUserBodySchema }), createUser); // body

/**
 * @route GET /users
 * @description Get a list of users
 * @access Public
 * @allowedQueries
 * - name: string (optional)
 * - role: string (optional)
 * - page: number (optional)
 * - limit: number (optional)
 */
router.get("/", validateSchema({ query: getUsersQuerySchema }), getUsers); // query

/**
 * @route GET /users/:userId
 * @description Get user by id
 * @access Public
 */
router.get(
  "/:userId",
  validateSchema({ params: getUserByIdParamsSchema }),
  getUserById
); // params

/**
 * @route GET /users/:userId/tasks
 * @description Get user's tasks
 * @access Public
 * @allowedQueries
 * - page: number (optional)
 * - limit: number (optional)
 */
router.get(
  "/:userId/tasks",
  validateSchema({
    params: getUserTasksParamsSchema,
    query: getUserTasksQuerySchema,
  }),
  getUserTasks
); // params; query

/**
 * @route PATCH /users/:userId
 * @description Edit user
 * @access Public
 * @requiredBody
 * - name: string (optional)
 * - role: tring (optional)
 */
router.patch(
  "/:userId",
  validateSchema({ params: editUserParamsSchema, body: editUserBodySchema }),
  editUser
); // params; body

/**
 * @route PATCH /users/:userId/tasks/:taskId/assign
 * @description Assign a task to an user
 * @access Public
 */
router.patch(
  "/:userId/tasks/:taskId/assign",
  validateSchema({ params: assignTaskParamsSchema }),
  assignTask
); // params

/**
 * @route PATCH /users/:userId/tasks/:taskId/unassign
 * @description Unassign a task from an user
 * @access Public
 */
router.patch(
  "/:userId/tasks/:taskId/unassign",
  validateSchema({ params: unassignTaskParamsSchema }),
  unassignTask
); // params

/**
 * @route DELETE /users/:userId
 * @description Delete user
 * @access Public
 */
router.delete(
  "/:userId",
  validateSchema({ params: deleteUserParamsSchema }),
  deleteUser
); // params

module.exports = router;
