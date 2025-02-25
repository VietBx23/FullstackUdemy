const createDatabaseConnection = require("../config/database"); // Nhập hàm kết nối từ config

class Vouchers {
  // Lấy tất cả discount products
  static async findAll() {
    let connection;
    try {
      connection = await createDatabaseConnection(); // Tạo kết nối cơ sở dữ liệu
      const [rows] = await connection.query("SELECT * FROM  vouchers");
      return rows;
    } catch (err) {
      console.error("Error querying database:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end(); // Đảm bảo đóng kết nối khi xong
    }
  }

  // Lấy discount product theo ID
  static async findById(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM vouchers WHERE id = ?",
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

  // Tạo mới discount product
  static async create(discountData) {
    const { code, discount_amount, quantity, start_date, end_date, activate } =
      discountData;
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "INSERT INTO vouchers (code, discount_amount, quantity, start_date, end_date, activate) VALUES (?, ?, ?, ?, ?, ?)",
        [code, discount_amount, quantity, start_date, end_date, activate]
      );
      return result.insertId;
    } catch (err) {
      console.error("Error inserting vouchers:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Cập nhật discount product
  static async update(id, discountData) {
    const { code, discount_amount, quantity, start_date, end_date, activate } =
      discountData;
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query(
        "UPDATE vouchers SET code = ?, discount_amount = ?, quantity = ?, start_date = ?, end_date = ?, activate = ? WHERE id = ?",
        [code, discount_amount, quantity, start_date, end_date, activate, id]
      );
    } catch (err) {
      console.error("Error updating vouchers:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Xóa discount product
  static async delete(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query("DELETE FROM vouchers WHERE id = ?", [id]);
    } catch (err) {
      console.error("Error deleting Vouchers:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }
}

module.exports = Vouchers;
