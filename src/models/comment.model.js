const createDatabaseConnection = require("../config/database");

class Comment {
  static async findAll() {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query("SELECT * FROM comments");
      return rows;
    } catch (error) {
      console.error("Error querying database", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  static async findById(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM comments WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error("Error querying database", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  static async getCommentsByProductId(productId) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM comments WHERE product_id = ?",
        [productId]
      );
      return rows;
    } catch (error) {
      console.error("Error querying database:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  static async createComment(comment) {
    const { product_id, description, username, rating } = comment;
    let connection;

    try {
      connection = await createDatabaseConnection();

      const [result] = await connection.query(
        "INSERT INTO comments (product_id, description, username, rating) VALUES (?, ?, ?, ?)",
        [product_id, description, username, rating]
      );
      return result.insertId; // Trả về ID của bản ghi vừa chèn vào
    } catch (error) {
      console.error("Error creating comment:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  static async update(id, comment) {
    const { product_id, description, username, rating } = comment;
    let connection;
    try {
      connection = await createDatabaseConnection();

      const [result] = await connection.query(
        "UPDATE comments SET product_id = ?, description = ?, username = ?, rating = ? WHERE id = ?",
        [product_id, description, username, rating, id]
      );

      return result.affectedRows; // Trả về số lượng hàng bị ảnh hưởng
    } catch (error) {
      console.error("Error updating comment:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  static async delete(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "DELETE FROM comments WHERE id = ?",
        [id]
      );
      return result.affectedRows; // Trả về số lượng bản ghi bị xóa
    } catch (error) {
      console.error("Error deleting comment:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
}

module.exports = Comment;
