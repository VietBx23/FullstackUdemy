const createDatabaseConnection = require("../config/database");

class User {
  // Lấy tất cả người dùng
  static async findAllUsers() {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query("SELECT * FROM users");
      return rows; // Trả về tất cả người dùng
    } catch (error) {
      console.error("Error querying database:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Lấy người dùng theo ID
  static async getUserById(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );
      return rows[0]; // Trả về người dùng theo ID
    } catch (error) {
      console.error("Error querying database:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Tạo mới người dùng
  static async createUser(user) {
    const {
      username,
      password,
      email,
      fullname,
      image,
      jwt_token,
      token_expires_at,
    } = user;
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "INSERT INTO users (username, password, email, fullname, image, jwt_token, token_expires_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          username,
          password,
          email,
          fullname,
          image,
          jwt_token,
          token_expires_at,
        ]
      );
      return result.insertId; // Trả về ID của người dùng mới
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Cập nhật thông tin người dùng
  static async updateUser(id, user) {
    const {
      username,
      password,
      email,
      fullname,
      image,
      jwt_token,
      token_expires_at,
    } = user;
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query(
        "UPDATE users SET username = ?, password = ?, email = ?, fullname = ?, image = ?, jwt_token = ?, token_expires_at = ? WHERE id = ?",
        [
          username,
          password,
          email,
          fullname,
          image,
          jwt_token,
          token_expires_at,
          id,
        ]
      );
    } catch (error) {
      console.error("Error updating user:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Xóa người dùng
  static async deleteUser(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query("DELETE FROM users WHERE id = ?", [id]);
    } catch (error) {
      console.error("Error deleting user:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
}

module.exports = User;
