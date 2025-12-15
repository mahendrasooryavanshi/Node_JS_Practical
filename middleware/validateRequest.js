const Joi = require("joi")
/**
 * Request Validation Middleware
 * Validates add-to-cart request body
 */
const validateRequest = (req, res, next) => {
  try {
    const schema = Joi.object({
      user_id: Joi.number().integer().required().messages({
        'numbers.base': `user_id should be a type of number.`,
        'number.integer': `user_id must be an integer.`,
        'any.required': `"user_id" is a required field`,
      }),
      product_id: Joi.number().integer().required().messages({
        'numbers.base': `product_id should be a type of number.`,
        'number.integer': `product_id must be an integer.`,
        'any.required': `"product_id" is a required field`,
      }),
      quantity: Joi.number().integer(1).required().messages({
        'numbers.base': `quantity should be a type of number.`,
        'number.min': `quantity must be at least 1.`,
        'number.integer': `quantity must be an integer.`,
        'any.required': `quantity is a required field`,
      })
    })

    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message
      })
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateRequest;

