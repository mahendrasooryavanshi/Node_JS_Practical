-- Database Schema for E-commerce Cart System
-- Run this script to create the database tables

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    category VARCHAR(100)
);

-- Carts table
CREATE TABLE IF NOT EXISTS carts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price_at_addition DECIMAL(10, 2) NOT NULL
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    final_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance optimization
-- Index on cart_items for cart_id lookup
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);

-- Composite index on carts for (user_id, status) lookup
CREATE INDEX IF NOT EXISTS idx_carts_user_status ON carts(user_id, status);

-- Index on products for category filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- Sample seed data (10 products with varying prices and stock)
-- Categories: 'electronics', 'clothing', 'books'

INSERT INTO products (name, price, stock_quantity, category) VALUES
('Wireless Mouse', 29.99, 50, 'electronics'),
('Gaming Keyboard', 79.99, 30, 'electronics'),
('USB-C Cable', 15.99, 100, 'electronics'),
('Laptop Stand', 45.00, 25, 'electronics'),
('T-Shirt', 19.99, 80, 'clothing'),
('Jeans', 49.99, 60, 'clothing'),
('Sneakers', 89.99, 40, 'clothing'),
('JavaScript Guide', 24.99, 35, 'books'),
('Node.js Handbook', 29.99, 20, 'books'),
('Web Development Basics', 19.99, 45, 'books')
ON CONFLICT DO NOTHING;

