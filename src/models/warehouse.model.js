const createDatabaseConnection = require("../config/database");

class Warehouse {
  static async findAll() {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query("SELECT * FROM warehouses");
      return rows;
    } catch (error) {
      console.error("Error querying database", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
  // tìm kiếm kho hàng theo id
  static async findById(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM warehouses WHERE id = ?",
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
  // tìm kiếm số lượng sản phẩm theo size và màu sắc
  static async findBySizeColorProductId(size, color, product_id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT quantity FROM warehouses WHERE size = ? AND color = ? AND product_id = ?",
        [size, color, product_id]
      );
      return rows; // Trả về danh sách các kết quả
    } catch (error) {
      console.error("Error querying database", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  //   static async createWarehouse(warehouse) {
  //     const { product_id, size, color, quantity } = warehouse;
  //     let connection;

  //     try {
  //       connection = await createDatabaseConnection();

  //       // Định dạng dữ liệu để chèn vào bảng
  //       const result = await connection.query(
  //         "INSERT INTO warehouses (product_id, size, color, quantity) VALUES (?, ?, ?, ?)",
  //         [product_id, size, color, quantity]
  //       );
  //       return result.insertId; // Trả về ID của bản ghi vừa chèn vào
  //     } catch (error) {
  //       console.error("Error creating warehouse entry:", error.message);
  //       throw error;
  //     } finally {
  //       if (connection) await connection.end();
  //     }
  //   }
  static async createWarehouse(warehouse) {
    const { product_id, size, color, quantity } = warehouse;
    let connection;

    try {
      connection = await createDatabaseConnection();

      // Kiểm tra nếu đã tồn tại bản ghi với product_id, size, và color thì cộng dồn quantity
      const [existingRow] = await connection.query(
        "SELECT id, quantity FROM warehouses WHERE product_id = ? AND size = ? AND color = ?",
        [product_id, size, color]
      );

      if (existingRow.length > 0) {
        // Cập nhật quantity nếu bản ghi đã tồn tại
        const updatedQuantity = existingRow[0].quantity + quantity;
        const [result] = await connection.query(
          "UPDATE warehouses SET quantity = ? WHERE id = ?",
          [updatedQuantity, existingRow[0].id]
        );
        return existingRow[0].id; // Trả về id của bản ghi đã cập nhật
      } else {
        // Nếu không tồn tại thì chèn mới
        const [result] = await connection.query(
          "INSERT INTO warehouses (product_id, size, color, quantity) VALUES (?, ?, ?, ?)",
          [product_id, size, color, quantity]
        );
        return result.insertId; // Trả về ID của bản ghi vừa chèn vào
      }
    } catch (error) {
      console.error("Error creating warehouse entry:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  static async update(id, warehouse) {
    const { product_id, size, color, quantity } = warehouse;
    let connection;
    try {
      connection = await createDatabaseConnection();

      const [result] = await connection.query(
        "UPDATE warehouses SET product_id = ?, size = ?, color = ?, quantity = ? WHERE id = ?",
        [product_id, size, color, quantity, id]
      );

      return result.affectedRows; // Trả về số lượng hàng bị ảnh hưởng
    } catch (error) {
      console.error("Error updating warehouse entry:", error.message);
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
        "DELETE FROM warehouses WHERE id = ?",
        [id]
      );
      return result.affectedRows; // Trả về số lượng bản ghi bị xóa
    } catch (error) {
      console.error("Error deleting warehouse entry:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
}

module.exports = Warehouse;
