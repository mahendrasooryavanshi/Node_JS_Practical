# Node.js Developer Evaluation Task - E-commerce Cart System

**Time Limit:** 45 minutes  
**Experience Level:** 3 Years Node.js  
**Domain:** E-commerce

---

## Task Overview
Build a **Shopping Cart API** with discount calculation, inventory management, and order processing logic.

---

## Pre-provided Setup

You will be given a starter project with:
- Express.js server setup
- Database connection configured (PostgreSQL)

## Part 1: Logical Skills (15 minutes - 30 points)

### Task 1.1: Add to Cart Logic
**Endpoint:** `POST /api/cart/items`

**Requirements:**
- Add product to user's active cart (create cart if doesn't exist)
- Validate product exists and has sufficient stock
- If item already in cart, update quantity instead of creating duplicate
- Store current product price (price_at_addition)
- Return updated cart with all items

**Request Body:**
```json
{
  "user_id": 1,
  "product_id": 5,
  "quantity": 2
}
```

**Expected Response:**
```json
{
  "cart_id": 1,
  "items": [
    {
      "product_id": 5,
      "product_name": "Wireless Mouse",
      "quantity": 2,
      "price": 29.99,
      "subtotal": 59.98
    }
  ],
  "total": 59.98
}
```

### Task 1.2: Calculate Discount
**Endpoint:** `POST /api/cart/:cartId/calculate-discount`

**Discount Rules (Implement ALL):**
1. **Bulk Discount:** If total quantity of items >= 10, apply 10% discount
2. **Category Discount:** If cart contains 3+ items from 'electronics' category, apply 15% on electronics items
3. **Cart Value Discount:** If cart total > $200, apply $25 flat discount
4. **Apply highest single discount only** (no stacking)

**Request Body:**
```json
{
  "promo_code": "SAVE10" // optional, ignore for this task
}
```

**Expected Response:**
```json
{
  "cart_id": 1,
  "subtotal": 250.00,
  "discount_type": "cart_value",
  "discount_amount": 25.00,
  "final_total": 225.00,
  "items": [...]
}
```

---

## Part 2: Middleware Skills (10 minutes - 25 points)

### Task 2.1: Stock Validation Middleware
**Create:** `validateStock` middleware

**Requirements:**
- Use before add-to-cart endpoint
- Check if requested quantity is available in stock
- Return 400 with message: "Insufficient stock. Available: X"
- Attach product details to `req.product`

### Task 2.2: Cart Ownership Middleware
**Create:** `verifyCartOwnership` middleware

**Requirements:**
- Verify cart belongs to the user_id in request
- Return 403 if cart belongs to different user
- Attach cart details to `req.cart`

### Task 2.3: Request Validation
**Create:** Validation for add-to-cart request

**Requirements:**
- Validate required fields: user_id, product_id, quantity
- Ensure quantity is positive integer between 1-100
- Return 400 with clear error messages

---

## Part 3: API Performance (10 minutes - 25 points)

### Task 3.1: Optimize Cart Retrieval
**Endpoint:** `GET /api/cart/:userId/active`

**Requirements:**
- Retrieve active cart with all items and product details
- **Avoid N+1 query problem** - use JOIN
- Return cart even if empty (empty items array)
- Query should execute in single database call

**Expected Response:**
```json
{
  "cart_id": 1,
  "user_id": 1,
  "items": [
    {
      "product_id": 5,
      "product_name": "Wireless Mouse",
      "current_price": 29.99,
      "price_at_addition": 29.99,
      "quantity": 2,
      "stock_available": 50
    }
  ],
  "item_count": 2,
  "total": 59.98
}
```

### Task 3.2: Inventory Check Optimization
**Endpoint:** `POST /api/cart/validate-inventory`

**Requirements:**
- Check if all items in cart have sufficient stock
- Return list of out-of-stock or low-stock items
- Use efficient single query with aggregation

**Expected Response:**
```json
{
  "is_valid": false,
  "issues": [
    {
      "product_id": 3,
      "product_name": "Gaming Keyboard",
      "requested": 5,
      "available": 2
    }
  ]
}
```

---

## Part 4: RDBMS Database Expertise (10 minutes - 20 points)

### Task 4.1: Checkout with Transaction
**Endpoint:** `POST /api/cart/:cartId/checkout`

**Requirements:**
- Use database transaction for atomicity
- Steps to perform:
  1. Validate all items have sufficient stock
  2. Calculate final amount with discount
  3. Create order record
  4. Reduce stock quantity for each product
  5. Update cart status to 'checked_out'
- **Rollback entire transaction if any step fails**
- Return order details with items

**Request Body:**
```json
{
  "user_id": 1
}
```

**Expected Response:**
```json
{
  "order_id": 15,
  "user_id": 1,
  "items": [...],
  "subtotal": 250.00,
  "discount_amount": 25.00,
  "final_amount": 225.00,
  "status": "pending",
  "created_at": "2025-11-01T10:30:00Z"
}
```

### Task 4.2: Database Query Optimization
**Requirements:**
- Add appropriate index on `cart_items` for cart_id lookup
- Add composite index on `carts` for (user_id, status) lookup
- Write the SQL statements in comments

```sql
-- Example:
CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
```

---

## Submission Deliverables

### Required Files:
1. **routes/cart.js** - All route definitions
2. **controllers/cartController.js** - Business logic
3. **middleware/** - All middleware files

### What to Submit:
- ✅ Working API endpoints (all 6 endpoints)
- ✅ Middleware implementations (3 middleware)
- ✅ Database queries optimized (JOIN usage, indexes)
- ✅ Transaction handling for checkout
- ✅ Brief comments explaining complex logic

---

## Testing Tips

Use this sample test flow:
1. Add 3 electronics items to cart (test category discount)
2. Add 10+ items total (test bulk discount)
3. Get active cart (test performance)
4. Validate inventory
5. Checkout (test transaction)

---

## Success Criteria

✅ All 6 endpoints working correctly  
✅ Discount calculation logic accurate  
✅ No N+1 query problems  
✅ Transaction properly handles rollback  
✅ Middleware properly validates and protects routes  
✅ Code is clean and well-commented  

**Good luck! Focus on working code over perfection.**