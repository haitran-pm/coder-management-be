var express = require("express");
const Joi = require("joi");

// Validate function with defined schema
const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorDetails = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errorDetails,
      });
    }
    next();
  };
};

module.exports = validateSchema;
