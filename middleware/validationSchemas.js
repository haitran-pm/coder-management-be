const Joi = require("joi");

// User validation schema
const userValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `"name" should be a string`,
    "any.required": `"name" is required`,
  }),
  role: Joi.string()
    .valid("manager", "employee")
    .default("employee")
    .optional()
    .messages({
      "string.base": `"role" should be a string`,
      "any.only": `"role" must be one of [manager, employee]`,
    }),
});

// Task validation schema
const taskValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `"name" should be a string`,
    "any.required": `"name" is required`,
  }),
  description: Joi.string().required().messages({
    "string.base": `"description" should be a string`,
    "any.required": `"description" is required`,
  }),
  status: Joi.string()
    .valid("pending", "working", "review", "done", "archive")
    .default("pending")
    .optional()
    .messages({
      "string.base": `"status" should be a string`,
      "any.only": `"status" must be one of [pending, working, review, done, archive]`,
    }),
  user: Joi.string().optional().messages({
    "string.base": `"user" should be a string`,
  }),
});

module.exports = { userValidationSchema, taskValidationSchema };
