require("dotenv").config();
const express = require("express"); // commonjs
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const webRouter = require("./routes/web");
const mysql = require("mysql2/promise"); // dùng `mysql2/promise` để hỗ trợ `async/await`
const app = express(); // commonjs  app express
const port = process.env.PORT || 8082; // port number to listen on

configViewEngine(app);

app.use("/v1", webRouter);

// Hàm kết nối và thực hiện truy vấn MySQL
const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost", // host name
      port: 3307, // default port for mysql
      user: "root", // username
      password: "123456", // password
      database: "hoidanit", // database name
    });

    const [results, fields] = await connection.query("SELECT * FROM Users u");
    console.log(">>> Results:", results);
    console.log(">>> Fields:", fields);
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
};

// Gọi hàm kết nối khi server khởi động
connectToDatabase();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
