const createDatabaseConnection = require("../config/database"); // Nhập hàm kết nối từ config
class Categories {
  static async getAllCategories() {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query("SELECT * FROM categories");
      return rows;
    } catch (error) {
      console.error("Error quering database: ", error.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }

  static async getCategoriesById(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM categories WHERE id = ?",
        [id]
      );
      return rows;
    } catch (error) {
      console.log("Error querying database: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
  static async createCategory(category) {
    const { name, available } = category; // Destructuring object
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "INSERT INTO categories(name, available) VALUES(?,?)",
        [name, available]
      );
      return result.insertId; // Return id of inserted row
    } catch (error) {
      console.error("Error create account: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
  static async updateCategory(id, category) {
    const { name, available } = category; // Destructuring object
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query(
        "UPDATE categories set name= ? , available = ? WHERE id = ?",
        [name, available, id]
      );
    } catch (error) {
      console.log("Error update categories: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
  static async deleteCategory(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query("DELETE FROM categories WHERE id = ?", [id]);
    } catch (error) {
      console.error("Error deleting categories: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
}
module.exports = Categories;
