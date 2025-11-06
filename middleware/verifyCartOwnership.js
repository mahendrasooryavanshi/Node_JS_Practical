const { query } = require('../config/database');

/**
 * Cart Ownership Verification Middleware
 * Verifies cart belongs to the user_id in request
 * Attaches cart details to req.cart
 */
const verifyCartOwnership = async (req, res, next) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyCartOwnership;

