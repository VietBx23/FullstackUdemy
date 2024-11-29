const { json } = require("express");
const createDatabaseConnection = require("../config/database"); // Import database connection

const { getAllUser } = require("../services/CRUDService");

const create = (req, res) => {
  res.render("create.ejs");
};
const abc = (req, res) => {
  res.render("sample.ejs");
};

const getHomePage = async (req, res) => {
  try {
    const listUsers = await getAllUser();
    return res.render("homePage.ejs", { listUsers });
  } catch (err) {
    console.error("Error rendering home page:", err.message);
    return res.status(500).send("Internal Server Error");
  }
};

const getUpdate = async (req, res) => {
  const userId = req.params.id;
  console.log("User ID: ", userId);
  let connection;
  try {
    connection = await createDatabaseConnection(); // Tạo kết nối
    const [results] = await connection.query(
      "SELECT * FROM Users WHERE id = ?",
      [userId]
    );

    // Kiểm tra nếu không tìm thấy người dùng
    if (results.length === 0) {
      return res.status(404).send("User not found");
    }

    // Truyền thông tin người dùng vào view
    res.render("edit.ejs", { user: results[0] }); // Chú ý dòng này
  } catch (err) {
    console.error("Database query failed:", err.message);
    res.status(500).send("Internal Server Error");
  } finally {
    if (connection) await connection.end(); // Đóng kết nối
  }
};

const findUserById = async (req, res) => {
  const { id } = req.params; // Lấy id từ URL
  let connection;

  try {
    connection = await createDatabaseConnection();
    const [results] = await connection.execute(
      "SELECT * FROM Users WHERE id = ?",
      [id]
    );

    if (results.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.json(results[0]); // Trả về kết quả
    }
  } catch (err) {
    console.error("Database query failed:", err.message);
    res.status(500).send("Internal Server Error");
  } finally {
    if (connection) await connection.end();
  }
};

const getAllUsers = async (req, res) => {
  let connection;
  try {
    connection = await createDatabaseConnection(); // Tạo kết nối
    const [results] = await connection.query("SELECT * FROM Users u"); // Sử dụng await, không dùng callback
    console.log(">>> Check result: ", results);
    res.json(results); // Trả về kết quả dưới dạng JSON
  } catch (err) {
    console.error("Database query failed:", err.message);
    res.status(500).send("Internal Server Error");
  } finally {
    if (connection) await connection.end(); // Đóng kết nối
  }
};

const postCreateUser = async (req, res) => {
  const { email, name, city } = req.body; // Lấy dữ liệu từ form
  let connection;

  console.log(">>email : ", email, ">>name : ", name, ">>city : ", city); // Debug dữ liệu
  try {
    // Tạo kết nối cơ sở dữ liệu
    connection = await createDatabaseConnection();

    // Thực hiện truy vấn
    const [results] = await connection.execute(
      "INSERT INTO Users (email, name, city) VALUES (?, ?, ?)",
      [email, name, city]
    );

    console.log(results); // Log kết quả nếu cần
    // res.send("Create user succeeded");
    res.redirect("/v1");
  } catch (err) {
    // Xử lý lỗi
    console.error("Database query failed:", err.message);
    res.status(500).send("Internal Server Error");
  } finally {
    // Đóng kết nối nếu đã mở
    if (connection) await connection.end();
  }
};
const updateUser = async (req, res) => {
  const { id, email, name, city } = req.body; // Lấy dữ liệu từ form
  let connection;

  console.log(
    ">>email : ",
    email,
    ">>name : ",
    name,
    ">>city : ",
    city,
    ">> id :",
    id
  ); // Debug dữ liệu
  try {
    // Tạo kết nối cơ sở dữ liệu
    connection = await createDatabaseConnection();

    const [results] = await connection.execute(
      "UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?",
      [email, name, city, id]
    );

    // console.log(results); // Log kết quả nếu cần
    // res.send("Create user succeeded");
    res.redirect("/v1");
  } catch (err) {
    // Xử lý lỗi
    console.error("Database query failed:", err.message);
    res.status(500).send("Internal Server Error");
  } finally {
    // Đóng kết nối nếu đã mở
    if (connection) await connection.end();
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params; // Lấy id từ URL
  let connection;

  try {
    connection = await createDatabaseConnection();

    const [results] = await connection.execute(
      "DELETE FROM Users WHERE id = ?",
      [id]
    );

    if (results.affectedRows === 0) {
      res.status(404).send("User not found");
    } else {
      res.redirect("/v1");
    }
  } catch (err) {
    console.error("Database query failed:", err.message);
    res.status(500).send("Internal Server Error");
  } finally {
    if (connection) await connection.end();
  }
};

module.exports = {
  getHomePage,
  create,
  abc,
  getAllUsers,
  postCreateUser,
  updateUser,
  deleteUser,
  findUserById,
  getUpdate,
};
