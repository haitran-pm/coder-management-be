const Joi = require("joi");

const deleteTaskParamsSchema = Joi.object({
  taskId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

module.exports = { deleteTaskParamsSchema };
