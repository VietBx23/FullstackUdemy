const createDatabaseConnection = require("../config/database");

class ShoppingCart {
  // Lấy tất cả sản phẩm trong giỏ hàng của người dùng
  static async findByUsername(username) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM shopping_cart WHERE username = ?",
        [username]
      );
      return rows;
    } catch (err) {
      console.error("Error querying database:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Thêm một sản phẩm vào giỏ hàng
  static async addToCart(cartData) {
    const { username, product_id, image, size, price, qty, total } = cartData;
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "INSERT INTO shopping_cart (username, product_id, image, size, price, qty, total) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [username, product_id, image, size, price, qty, total]
      );
      return result.insertId;
    } catch (err) {
      console.error("Error adding to cart:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Cập nhật số lượng và tổng tiền của sản phẩm trong giỏ hàng
  static async updateCartItem(id, qty, total) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query(
        "UPDATE shopping_cart SET qty = ?, total = ? WHERE id = ?",
        [qty, total, id]
      );
    } catch (err) {
      console.error("Error updating cart item:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  static async deleteFromCart(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query("DELETE FROM shopping_cart WHERE id = ?", [id]);
    } catch (err) {
      console.error("Error deleting from cart:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Xóa tất cả sản phẩm trong giỏ hàng của người dùng
  static async clearCart(username) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query("DELETE FROM shopping_cart WHERE username = ?", [
        username,
      ]);
    } catch (err) {
      console.error("Error clearing cart:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }
}

module.exports = ShoppingCart;
