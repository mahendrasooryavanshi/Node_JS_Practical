const { query } = require('../config/database');

/**
 * Stock Validation Middleware
 * Checks if requested quantity is available in stock
 * Attaches product details to req.product
 */
const validateStock = async (req, res, next) => {
  try {
    const { product_id, quentity } = req.body;
    const [product] = await query(`select * from products where id=?`, [product_id]);
    console.log(product, ">>>>>>>>>")
    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product Not found."
      })
    }
    if (product.stock_quantity < quentity) {
      return res.status(404).json({
        status: 404,
        message: "Product is out of stock."
      })
    }
    req.product = product
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateStock;

