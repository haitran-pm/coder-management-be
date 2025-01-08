const validateSchema = (schemas) => {
  return (req, res, next) => {
    let errors = [];

    // Loop qua từng phần của object schemas
    Object.entries(schemas).forEach(([part, schema]) => {
      if (schema) {
        // Đảm bảo part value không null hoặc undefined
        const { error } = schema.validate(req[part], { abortEarly: false }); // Function của Joi, abortEarly để không exit giữa chừng
        if (error) {
          errors = errors.concat(
            // Kết hợp với các lỗi trước đó (nếu có) thành một array errors
            error.details.map((detail) => ({
              // Trả về một object error lỗi có 3 thành phần message, path và part
              message: detail.message.replace(/"/g, ""), // Loại bỏ double-quote
              path: detail.path,
              part,
            }))
          );
        }
      }
    });

    // Return lỗi nếu có
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    next();
  };
};

module.exports = validateSchema;
