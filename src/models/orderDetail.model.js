const createDatabaseConnection = require("../config/database");

class orderDetail {
  // Lấy tất cả các OrderDetails
  static async getAllOrderDetail() {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query("SELECT * FROM OrderDetails");
      return rows;
    } catch (error) {
      console.error("Error querying database: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Lấy OrderDetail theo ID
  static async getOrderDetailById(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM OrderDetails WHERE id = ?",
        [id]
      );
      return rows[0]; // Trả về 1 bản ghi hoặc undefined nếu không có
    } catch (error) {
      console.error("Error querying database: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  static async getOrderDetailsByOrderId(order_id) {
    let connection;
    try {
      connection = await createDatabaseConnection();

      const [rows] = await connection.query(
        "SELECT * FROM OrderDetails WHERE order_id = ?",
        [order_id]
      );
      return rows[0];
    } catch (error) {
      console.error("Error querying database:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Tạo một OrderDetail mới
  static async createOrderDetail(orderDetail) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const { order_id, product_id, price, quantity, size, color } =
        orderDetail;
      const [result] = await connection.query(
        "INSERT INTO OrderDetails (order_id, product_id, price, quantity, size, color) VALUES (?, ?, ?, ?, ?, ?)",
        [order_id, product_id, price, quantity, size, color]
      );
      return result.insertId; // Trả về ID của bản ghi đã được tạo
    } catch (error) {
      console.error("Error querying database: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Cập nhật OrderDetail theo ID
  static async updateOrderDetail(id, orderDetail) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const { order_id, product_id, price, quantity, size, color } =
        orderDetail;
      const [result] = await connection.query(
        "UPDATE OrderDetails SET order_id = ?, product_id = ?, price = ?, quantity = ?, size = ?, color = ? WHERE id = ?",
        [order_id, product_id, price, quantity, size, color, id]
      );
      return result.affectedRows > 0; // Kiểm tra có cập nhật thành công hay không
    } catch (error) {
      console.error("Error querying database: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Xóa OrderDetail theo ID
  static async deleteOrderDetail(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "DELETE FROM OrderDetails WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0; // Kiểm tra có xóa thành công hay không
    } catch (error) {
      console.error("Error querying database: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
}

module.exports = orderDetail;
