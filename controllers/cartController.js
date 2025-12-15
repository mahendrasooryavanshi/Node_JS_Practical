const { query } = require('../config/database');


/**
 * Add product to cart
 * POST /api/cart/items
 */
const addToCart = async (req, res, next) => {
  try {
    const { user_id, product_id, quantity } = req.body || null;
    const [cart] = await query(`SELECT * from carts where user_id=$1 AND status=$2`, [user_id, 'active']);

    if (!cart) {
      const result = await query(`INSERT INTO carts (user_id,status) VALUES($1,$2) RETURNING *`, [user_id, 'active'])
      cart = result[0];
    }

    //check if iteam alredy exited in the cart

    const [exitedItems] = await query(`SELECT * FROM cart_items WHERE cart_id=$1,
      product_id=$2`, [cart.id, product_id]);

    if (exitedItems) {
      // update quentity of items
      await query(`UPDATE cart_items SET quantity = quantity+ $1 WHERE id = $2`, [quantity, exitedItems.id]);
    } else {
      //inset new items with price
      const [result] = await query(`SELECT price from products WHERE id = $1`, [product_id]);
      const product = result.rows[0]
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        })
      }
      await query(`insert into  cart_items(cart_id,product_id,quantity,price_at_addition) VALUES ($1,$2,$3,$4) RETURNING *`, [cart.id, product_id, quantity, product.price])
    }
    const items = await query(
      `SELECT ci.product_id, ci.quantity, ci.price_at_addition, p.name, p.stock_quantity
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = $1`,
      [cart.id]
    );

    const result = items.rows;

    return res.status(201).json({
      status: 201,
      message: "Added in cart item successfully",
      data: result
    })

  } catch (error) {
    next(error);
  }
};

/**
 * Calculate discount for cart
 * POST /api/cart/:cartId/calculate-discount
 */
const calculateDiscount = async (req, res, next) => {
  try {
    // TODO: Implement discount calculation
    // Rules:
    // 1. Bulk Discount: total quantity >= 10, apply 10% discount
    // 2. Category Discount: 3+ electronics items, apply 15% on electronics
    // 3. Cart Value Discount: cart total > $200, apply $25 flat discount
    // 4. Apply highest single discount only (no stacking)

    res.status(501).json({ message: 'Not implemented yet' });
  } catch (error) {
    next(error);
  }
};

/**
 * Get active cart for user
 * GET /api/cart/:userId/active
 */
const getActiveCart = async (req, res, next) => {
  try {
    // TODO: Implement optimized cart retrieval
    // - Use JOIN to avoid N+1 query problem
    // - Return cart even if empty
    // - Single database call

    res.status(501).json({ message: 'Not implemented yet' });
  } catch (error) {
    next(error);
  }
};

/**
 * Validate inventory for cart items
 * POST /api/cart/validate-inventory
 */
const validateInventory = async (req, res, next) => {
  try {
    // TODO: Implement inventory validation
    // - Check all items in cart have sufficient stock
    // - Return list of out-of-stock or low-stock items
    // - Use efficient single query with aggregation

    res.status(501).json({ message: 'Not implemented yet' });
  } catch (error) {
    next(error);
  }
};

/**
 * Checkout cart and create order
 * POST /api/cart/:cartId/checkout
 */
const checkout = async (req, res, next) => {
  try {
    // TODO: Implement checkout with transaction
    // Steps:
    // 1. Validate all items have sufficient stock
    // 2. Calculate final amount with discount
    // 3. Create order record
    // 4. Reduce stock quantity for each product
    // 5. Update cart status to 'checked_out'
    // Use database transaction - rollback if any step fails

    res.status(501).json({ message: 'Not implemented yet' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToCart,
  calculateDiscount,
  getActiveCart,
  validateInventory,
  checkout
};

