const createDatabaseConnection = require("../config/database"); // Nhập hàm kết nối từ config

class ImageProduct {
  static async getAllImageProduct() {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query("SELECT * FROM imageProducts");
      return rows;
    } catch (error) {
      console.error("Error querying database: ", error.message);
    } finally {
      if (connection) await connection.end(); // Đóng kết nối
    }
  }

  static async getImageProductByProductId(product_id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM imageProducts WHERE product_id = ?",
        [product_id]
      );
      return rows[0];
    } catch (error) {
      console.error("Error querying database: ", error.message);
      throw error; // Throwing the error to handle it in the calling function
    } finally {
      if (connection) await connection.end(); // Đóng kết nối
    }
  }

  static async getImageProductLimit5(product_id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM imageProducts WHERE product_id = ? LIMIT 5",
        [product_id]
      );
      return rows[0];
    } catch (error) {
      console.error("Error querying database: ", error.message);
      throw error; // Throwing the error to handle it in the calling function
    } finally {
      if (connection) await connection.end(); // Đóng kết nối
    }
  }
  static async getImageProductById(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM imageProducts WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error("Error querying database: ", error.message);
      throw error; // Throwing the error to handle it in the calling function
    } finally {
      if (connection) await connection.end(); // Đóng kết nối
    }
  }
  static async createImageProduct(imageProducts) {
    const { image, product_id } = imageProducts;
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "INSERT INTO imageProducts(image, product_id) VALUES(?,?)",
        [image, product_id]
      );
      return rows;
    } catch (error) {
      console.error("Error querying database: ", error.message);
      throw error; // Throwing the error to handle it in the calling function
    } finally {
      if (connection) await connection.end(); // Đóng kết nối
    }
  }
  static async updateImageProduct(id, imageProducts) {
    const { image, product_id } = imageProducts;
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "UPDATE imageProducts SET image = ?, product_id = ? WHERE id = ?",
        [image, product_id, id]
      );
    } catch (error) {
      console.error("Error querying database: ", error.message);
      throw error; // Throwing the error to handle it in the calling function
    } finally {
      if (connection) await connection.end();
    }
  }
  static async deleteImageProduct(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      await connection.query("DELETE FROM imageProducts WHERE id = ?", [id]);
    } catch (error) {
      console.error("Error deleting image product: ", error.message);
      throw error; // Throwing the error to handle it in the calling function
    } finally {
      if (connection) await connection.end(); // Đóng kết nối
    }
  }
}
module.exports = ImageProduct;
