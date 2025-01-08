const Joi = require("joi");

const createUserBodySchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
  role: Joi.string()
    .valid("manager", "employee")
    .default("employee")
    .optional(),
});

module.exports = { createUserBodySchema };
