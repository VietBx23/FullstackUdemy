const createDatabaseConnection = require("../config/database");

class Reply {
  static async findAll() {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query("SELECT * FROM replys");
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
        "SELECT * FROM replys WHERE id = ?",
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
  static async getReplysByProductIdAndCommentId(product_id, comment_id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM replys WHERE product_id = ? AND comment_id = ?",
        [product_id, comment_id]
      );
      return rows;
    } catch (error) {
      console.error("Error querying database", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
  static async createReply(reply) {
    const { description, product_id, comment_id, username, create_date } =
      reply;
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "INSERT INTO replys (description, product_id, comment_id, username) VALUES (?, ?, ?, ?)",
        [description, product_id, comment_id, username]
      );

      return result.insertId;
    } catch (error) {
      console.error("Error creating replys: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
  static async updateReply(id, reply) {
    const { description, product_id, comment_id, username } = reply;

    // Kiểm tra các trường bắt buộc
    if (!description || !product_id || !comment_id || !username) {
      throw new Error("All fields are required");
    }

    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "UPDATE replys SET description = ?, product_id = ?, comment_id = ?, username = ? WHERE id = ?",
        [description, product_id, comment_id, username, id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error updating replys: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  static async deleteReply(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "DELETE FROM replys WHERE id = ?",
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error deleting replys: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
}
module.exports = Reply;
