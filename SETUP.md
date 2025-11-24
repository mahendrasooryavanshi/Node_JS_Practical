# Setup Instructions

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup

#### Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ecommerce_db;

# Exit psql
\q
```

#### Run Schema Script
```bash
# Run the SQL schema file
psql -U postgres -d ecommerce_db -f config/database.sql
```

Or manually execute the SQL commands from `config/database.sql` in your PostgreSQL client.

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://neondb_owner:npg_fkh9zL6nMQtD@ep-super-recipe-a126kk6h-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Server Configuration
PORT=3000

# Node Environment
NODE_ENV=development
```

### 4. Start the Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

### 5. Verify Setup

Test the health endpoint:
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Project Structure

```
project/
├── server.js                 # Express server setup
├── package.json              # Dependencies and scripts
├── .env                      # Environment variables (create this)
├── .gitignore               # Git ignore rules
├── config/
│   ├── database.js          # Database connection pool
│   └── database.sql         # Database schema and seed data
├── routes/
│   └── cart.js              # Cart API routes
├── controllers/
│   └── cartController.js    # Business logic (TODO: implement)
└── middleware/
    ├── validateRequest.js   # Request validation
    ├── validateStock.js     # Stock validation
    └── verifyCartOwnership.js # Cart ownership verification
```

## API Endpoints

All endpoints are prefixed with `/api/cart`:

1. `POST /api/cart/items` - Add product to cart
2. `POST /api/cart/:cartId/calculate-discount` - Calculate discount
3. `GET /api/cart/:userId/active` - Get active cart
4. `POST /api/cart/validate-inventory` - Validate inventory
5. `POST /api/cart/:cartId/checkout` - Checkout cart

## Next Steps

1. Implement the controller logic in `controllers/cartController.js`
2. Test all endpoints using Postman or curl
3. Verify database transactions work correctly
4. Check query performance (no N+1 problems)

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `pg_isready`
- Check database credentials in `.env`
- Ensure database `ecommerce_db` exists

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process using the port: `lsof -ti:3000 | xargs kill`

### Module Not Found
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then reinstall

