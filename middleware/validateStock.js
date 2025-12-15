const { query } = require('../config/database');

/**
 * Stock Validation Middleware
 * Checks if requested quantity is available in stock
 * Attaches product details to req.product
 */
const validateStock = async (req, res, next) => {
  try {
    const { product_id, quantity } = req.body;

    const result = await query(
      `SELECT * FROM products WHERE id = $1`,
      [product_id]
    );

    const product = result.rows[0];

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product not found"
      });
    }

    if (product.stock_quantity < quantity) {
      return res.status(400).json({
        status: 400,
        message: "Insufficient stock"
      });
    }

    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateStock;

