const createDatabaseConnection = require("../config/database"); // Nhập hàm kết nối từ config

class Account {
  // Lấy tất cả accounts
  static async findAll() {
    let connection;
    try {
      connection = await createDatabaseConnection(); // Tạo kết nối cơ sở dữ liệu
      const [rows] = await connection.query("SELECT * FROM accounts");
      return rows;
    } catch (err) {
      console.error("Error querying database:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end(); // Đảm bảo đóng kết nối khi xong
    }
  }

  // Lấy account theo ID
  static async findById(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM accounts WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (err) {
      console.error("Error querying database:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Tạo mới account
  static async create(accountData) {
    const { username, password, email, fullname, image } = accountData;
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "INSERT INTO accounts (username, password, email, fullname, image) VALUES (?, ?, ?, ?, ?)",
        [username, password, email, fullname, image]
      );
      return result.insertId;
    } catch (err) {
      console.error("Error inserting account:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Cập nhật account
  static async update(id, accountData) {
    const { username, password, email, fullname, image } = accountData;
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query(
        "UPDATE accounts SET username = ?, password = ?, email = ?, fullname = ?, image = ? WHERE id = ?",
        [username, password, email, fullname, image, id]
      );
    } catch (err) {
      console.error("Error updating account:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Xóa account
  static async delete(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query("DELETE FROM accounts WHERE id = ?", [id]);
    } catch (err) {
      console.error("Error deleting account:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }
}

module.exports = Account;
