const createDatabaseConnection = require("../config/database");

class Authorities {
  constructor(id, username, roleId) {
    this.id = id;
    this.username = username;
    this.roleId = roleId;
  }

  // Lấy tất cả authorities từ database
  static async findAll() {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query("SELECT * FROM Authorities");
      return rows;
    } catch (error) {
      throw new Error(`Error querying authorities: ${error.message}`);
    } finally {
      if (connection) await connection.end();
    }
  }

  // Lấy authority theo id
  static async findById(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM Authorities WHERE id = ?",
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error finding authority: ${error.message}`);
    } finally {
      if (connection) await connection.end();
    }
  }

  // Thêm authority vào database
  static async create(authorityData) {
    let connection;
    const { username, roleId } = authorityData;
    if (!username || !roleId)
      throw new Error("Username and roleId are required");
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "INSERT INTO Authorities (username, roleId) VALUES (?, ?)",
        [username, roleId]
      );
      return { id: result.insertId, username, roleId };
    } catch (error) {
      throw new Error(`Error inserting authority: ${error.message}`);
    } finally {
      if (connection) await connection.end();
    }
  }

  // Cập nhật authority
  static async update(id, authorityData) {
    let connection;
    const { username, roleId } = authorityData;
    if (!username || !roleId)
      throw new Error("Username and roleId are required");
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "UPDATE Authorities SET username = ?, roleId = ? WHERE id = ?",
        [username, roleId, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating authority: ${error.message}`);
    } finally {
      if (connection) await connection.end();
    }
  }

  // Xóa authority theo id
  static async delete(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "DELETE FROM Authorities WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting authority: ${error.message}`);
    } finally {
      if (connection) await connection.end();
    }
  }
}

module.exports = Authorities;
