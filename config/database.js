require("dotenv").config();
const { Pool } = require("pg");
 
// Configure database connection for NeonDB
const getConnectionConfig = () => {
  const connectionString = process.env.DATABASE_URL;
 
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
 
  // Remove channel_binding parameter as it can cause issues with pg library
  // NeonDB works fine without it when SSL is properly configured
  let cleanConnectionString = connectionString;
  if (connectionString.includes("channel_binding=")) {
    cleanConnectionString = connectionString.replace(
      /[&?]channel_binding=[^&]*/g,
      ""
    );
    // Clean up any double & or trailing &
    cleanConnectionString = cleanConnectionString
      .replace(/&&/g, "&")
      .replace(/[&?]$/, "");
  }
 
  // Use connection string with SSL configuration for NeonDB
  return {
    connectionString: cleanConnectionString,
    ssl: {
      rejectUnauthorized: false, // Required for NeonDB
    },
  };
};
 
// Database connection pool
const pool = new Pool(getConnectionConfig());
 
// Test database connection
pool.on("connect", () => {
  console.log("Database connected successfully");
});
 
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
 
// Test connection on startup
(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Successfully connected to NeonDB");
    client.release();
  } catch (error) {
    console.error("❌ Failed to connect to NeonDB:", error.message);
    console.error("Please check your DATABASE_URL in .env file");
    process.exit(1);
  }
})();
 
// Helper function to execute queries
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error("Query error", { text, error: error.message });
    throw error;
  }
};
 
// Helper function to get a client for transactions
const getClient = async () => {
  const client = await pool.connect();
  return client;
};
 
module.exports = {
  pool,
  query,
  getClient,
};
 
 
