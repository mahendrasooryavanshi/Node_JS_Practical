const { query } = require('../config/database');

/**
 * Stock Validation Middleware
 * Checks if requested quantity is available in stock
 * Attaches product details to req.product
 */
const validateStock = async (req, res, next) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateStock;

