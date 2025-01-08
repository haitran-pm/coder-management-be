const Joi = require("joi");

const createTaskBodySchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
  description: Joi.string().trim().min(1).max(500).required(),
  status: Joi.string()
    .valid("pending", "working", "review", "done", "archive")
    .default("pending")
    .optional(),
  user: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

module.exports = { createTaskBodySchema };
