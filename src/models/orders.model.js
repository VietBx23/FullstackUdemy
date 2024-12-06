// models/orders.model.js
const createDatabaseConnection = require("../config/database");
const Order = {
  // Tạo một đơn hàng mới
  async createOrder(orderData) {
    const { username, address, total_amount, available, status } = orderData;
    const create_date = new Date(); // Lấy ngày hiện tại
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "INSERT INTO Orders (username, create_date, address, total_amount, available, status) VALUES (?, ?, ?, ?, ?, ?)",
        [username, create_date, address, total_amount, available, status]
      );
      return result.insertId;
    } catch (err) {
      console.error("Error creating order:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  },
  // Lấy danh sách đơn hàng của người dùng
  async getOrdersByUsername(username) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [orders] = await connection.query(
        "SELECT * FROM Orders WHERE username = ?",
        [username]
      );
      return orders;
    } catch (err) {
      console.error("Error fetching orders:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  },

  // Cập nhật trạng thái đơn hàng
  async updateOrderStatus(id, status) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "UPDATE Orders SET status = ? WHERE id = ?",
        [status, id]
      );
      return result.affectedRows > 0;
    } catch (err) {
      console.error("Error updating order status:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  },

  // Xóa một đơn hàng
  async deleteOrder(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "DELETE FROM Orders WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0;
    } catch (err) {
      console.error("Error deleting order:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  },
};

module.exports = Order;
