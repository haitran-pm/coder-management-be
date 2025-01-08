const Joi = require("joi");

const editTaskParamsSchema = Joi.object({
  taskId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

const editTaskBodySchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).optional(),
  description: Joi.string().trim().min(1).max(500).optional(),
  status: Joi.string()
    .valid("pending", "working", "review", "done", "archive")
    .default("pending")
    .optional(),
  user: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

module.exports = { editTaskParamsSchema, editTaskBodySchema };
