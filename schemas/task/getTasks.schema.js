const Joi = require("joi");

const getTasksQuerySchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).optional(),
  description: Joi.string().trim().min(1).max(500).optional(),
  status: Joi.string()
    .valid("pending", "working", "review", "done", "archive")
    .optional(),
  user: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
  page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(10).optional(),
});

module.exports = { getTasksQuerySchema };
