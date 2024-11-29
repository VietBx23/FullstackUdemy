require("dotenv").config(); // Load environment variables from .env file
const mysql = require("mysql2/promise"); // Import the mysql2/promise module
// Create a connection pool
const createDatabaseConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST, // host name
      port: process.env.DB_PORT, // default port for mysql
      user: process.env.DB_USER, // username
      password: process.env.DB_PASSWORD, // password
      database: process.env.DB_NAME, // database name
    });

    console.log("Database connection established.");
    return connection;
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
};

// Export một hàm trả về connection
module.exports = createDatabaseConnection;
