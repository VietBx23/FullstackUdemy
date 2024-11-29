const createDatabaseConnection = require("../config/database"); // Nhập hàm kết nối từ config
class Product {
  // view all products
  static async findAllProducts() {
    let connection;
    try {
      connection = await createDatabaseConnection(); // Kết nối database
      const [rows] = await connection.query("SELECT * FROM Products "); // Lấy dữ liệu
      return rows; // Trả về dữ liệu
    } catch (error) {
      console.error("Error querying database:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }
  // view product by id
  static async getProductById(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM Products WHERE id = ?",
        [id]
      );
      return rows[0]; // Trả về dữ liệu
    } catch (error) {
      console.error("Error querying database:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }

  // create product
  static async createProduct(product) {
    const { name, price, image } = product;
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [result] = await connection.query(
        "INSERT INTO Products (name, price, image) VALUES (?,?,?)",
        [name, price, image]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error updating account:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }
  // update product
  static async update(id, product) {
    const { name, price, image } = product;
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query(
        "UPDATE Products set name=?, price=?, image=? where id = ? ",
        [name, price, image, id]
      );
    } catch (error) {
      console.error("Error updating account:", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }
  // delete product
  static async delete(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query("DELETE FROM Products WHERE id = ?", [id]);
    } catch (error) {
      console.error("Error deleting products: ", err.message);
      throw err;
    } finally {
      if (connection) await connection.end();
    }
  }
}
module.exports = Product;
