const Joi = require("joi");

const getTaskByIdParamsSchema = Joi.object({
  taskId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

module.exports = { getTaskByIdParamsSchema };
