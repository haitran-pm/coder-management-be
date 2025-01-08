const Joi = require("joi");

const editUserParamsSchema = Joi.object({
  userId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

const editUserBodySchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).optional(),
  role: Joi.string()
    .valid("manager", "employee")
    .default("employee")
    .optional(),
});

module.exports = { editUserParamsSchema, editUserBodySchema };
