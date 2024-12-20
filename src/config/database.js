require("dotenv").config(); // Load environment variables from .env file
const mysql = require("mysql2/promise"); // Import the mysql2/promise module

const createDatabaseConnection = async () => {
  try {
    // const connection = await mysql.createConnection({
    //   host: process.env.DB_HOST, // host name
    //   port: process.env.DB_PORT, // default port for mysql
    //   user: process.env.DB_USER, // username
    //   password: process.env.DB_PASSWORD, // password
    //   database: process.env.DB_NAME, // database name
    // });
    //Pool
    const connection = await mysql.createPool({
      host: process.env.DB_HOST, // host name
      port: process.env.DB_PORT, // default port for mysql
      user: process.env.DB_USER, // username
      password: process.env.DB_PASSWORD, // password
      database: process.env.DB_NAME, // database name
      waitForConnections: true, // wait for connections to be available
      connectionLimit: 10, // maximum number of connections
      queueLimit: 0, // maximum number of queries in the queue
    });
    console.log("Database connection established.");
    return connection; // Return the connection object
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
};

// Export một hàm trả về connection
module.exports = createDatabaseConnection;
