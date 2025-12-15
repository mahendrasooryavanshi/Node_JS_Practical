const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const validateRequest = require('../middleware/validateRequest');
const validateStock = require('../middleware/validateStock');
const verifyCartOwnership = require('../middleware/verifyCartOwnership');

/**
 * POST /api/cart/items
 * Add product to cart
 */
router.post('/items',
  validateRequest,
  validateStock,
  cartController.addToCart
);

/**
 * POST /api/cart/:cartId/calculate-discount
 * Calculate discount for cart
 */
router.post('/:cartId/calculate-discount',
  verifyCartOwnership,
  cartController.calculateDiscount
);

/**
 * GET /api/cart/:userId/active
 * Get active cart for user
 */
router.get('/:userId/active', cartController.getActiveCart);

/**
 * POST /api/cart/validate-inventory
 * Validate inventory for cart items
 */
router.post('/validate-inventory', cartController.validateInventory);

/**
 * POST /api/cart/:cartId/checkout
 * Checkout cart and create order
 */
router.post('/:cartId/checkout',
  verifyCartOwnership,
  cartController.checkout
);

module.exports = router;

