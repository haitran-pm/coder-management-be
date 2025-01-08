const Joi = require("joi");

const getUsersQuerySchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).optional(),
  role: Joi.string()
    .valid("manager", "employee")
    .default("employee")
    .optional(),
  page: Joi.number().integer().min(1).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(10).optional(),
});

module.exports = { getUsersQuerySchema };
