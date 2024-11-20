const { json } = require("express");
const createDatabaseConnection = require("../config/database"); // Import database connection
// const { connect } = require("../routes/web");

const getHomePage = async (req, res) => {
  let connection;
  try {
    connection = await createDatabaseConnection(); // Tạo kết nối
    const [results] = await connection.query("SELECT * FROM Users"); // Sử dụng await, không dùng callback
    console.log(">>> Check result: ", results);
    res.json(results); // Trả về kết quả dưới dạng JSON
  } catch (err) {
    console.error("Database query failed:", err.message);
    res.status(500).send("Internal Server Error");
  } finally {
    if (connection) await connection.end(); // Đóng kết nối
  }
};

const abc = (req, res) => {
  res.render("sample.ejs");
};
module.exports = {
  getHomePage,
  abc,
};
