const createDatabaseConnection = require("../config/database");

class Role {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  // Lấy tất cả roles từ database
  static async findAll() {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query("SELECT * FROM roles");
      return rows; // Trả về danh sách roles
    } catch (error) {
      throw new Error(`Error querying roles: ${error.message}`);
    } finally {
      if (connection) await connection.end();
    }
  }

  // Lấy role theo id
  static async findById(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM roles WHERE id = ?",
        [id]
      );
      return rows[0] || null; // Trả về role đầu tiên hoặc null nếu không tìm thấy
    } catch (error) {
      throw new Error(`Error finding role: ${error.message}`);
    } finally {
      if (connection) await connection.end();
    }
  }

  // Thêm role vào database
  static async create(roleData) {
    let connection;
    const { id, name } = roleData;
    if (!id || !name) throw new Error("ID and name are required");
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "INSERT INTO roles (id, name) VALUES (?, ?)",
        [id, name]
      );
      return { id, name }; // Trả về object vừa tạo
    } catch (error) {
      throw new Error(`Error inserting role: ${error.message}`);
    } finally {
      if (connection) await connection.end();
    }
  }

  // Cập nhật role
  static async update(id, roleData) {
    let connection;
    const { name } = roleData;
    if (!name) throw new Error("Name is required");
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "UPDATE roles SET name = ? WHERE id = ?",
        [name, id]
      );
      return result.affectedRows > 0; // Trả về true nếu cập nhật thành công
    } catch (error) {
      throw new Error(`Error updating role: ${error.message}`);
    } finally {
      if (connection) await connection.end();
    }
  }

  // Xóa role theo id
  static async delete(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "DELETE FROM roles WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0; // Trả về true nếu xóa thành công
    } catch (error) {
      throw new Error(`Error deleting role: ${error.message}`);
    } finally {
      if (connection) await connection.end();
    }
  }
}

module.exports = Role;
