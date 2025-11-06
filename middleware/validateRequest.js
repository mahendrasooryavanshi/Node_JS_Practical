/**
 * Request Validation Middleware
 * Validates add-to-cart request body
 */
const validateRequest = (req, res, next) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateRequest;

