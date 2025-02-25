const createDatabaseConnection = require("../config/database");

class DiscountProduct {
  // Find all discount products
  static async findAll() {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query("SELECT * FROM discount_product");
      return rows; // Return all rows
    } catch (error) {
      console.error("Error querying database: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end(); // Close the connection
    }
  }

  // Find discount product by ID
  static async findById(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(
        "SELECT * FROM discount_product WHERE id = ?",
        [id]
      );
      return rows[0]; // Return the first (and only) row
    } catch (error) {
      console.error("Error querying database: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end(); // Close the connection
    }
  }

  // Create a new discount product
  static async create(discountData) {
    const { product_id, start_date, end_date, percentage, active } =
      discountData;
    let connection;
    try {
      connection = await createDatabaseConnection();

      // Kiểm tra xem product_id đã tồn tại trong bảng discount_product chưa
      const [existingProduct] = await connection.query(
        "SELECT * FROM discount_product WHERE product_id = ?",
        [product_id]
      );

      // Nếu sản phẩm đã tồn tại, kiểm tra xem thời gian giảm giá có trùng không
      if (existingProduct.length > 0) {
        const overlappingProduct = existingProduct.find((product) => {
          // Kiểm tra trùng thời gian với sản phẩm đã tồn tại
          return (
            (new Date(start_date) >= new Date(product.start_date) &&
              new Date(start_date) <= new Date(product.end_date)) ||
            (new Date(end_date) >= new Date(product.start_date) &&
              new Date(end_date) <= new Date(product.end_date)) ||
            (new Date(start_date) <= new Date(product.start_date) &&
              new Date(end_date) >= new Date(product.end_date))
          );
        });

        // Nếu có sản phẩm trùng thời gian, không cho phép thêm mới
        if (overlappingProduct) {
          throw new Error(
            "The product already has a discount with overlapping time period."
          );
        }
      }

      // Nếu chưa có sản phẩm trùng, hoặc không có sản phẩm nào, thực hiện thêm mới
      const [rows] = await connection.query(
        "INSERT INTO discount_product (product_id, start_date, end_date, percentage, active) VALUES (?, ?, ?, ?, ?)",
        [product_id, start_date, end_date, percentage, active]
      );

      return rows.insertId; // Return the ID of the newly inserted row
    } catch (error) {
      console.error("Error inserting into database: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end(); // Close the connection
    }
  }

  // Update discount product by ID
  static async update(id, discountData) {
    const { product_id, start_date, end_date, percentage, active } =
      discountData;
    let connection;
    try {
      connection = await createDatabaseConnection();
      // Check if the product exists
      const discountProduct = await this.findById(id);
      if (!discountProduct) {
        throw new Error("Discount product not found");
      }

      await connection.query(
        "UPDATE discount_product SET product_id = ?, start_date = ?, end_date = ?, percentage = ?, active = ? WHERE id = ?",
        [product_id, start_date, end_date, percentage, active, id]
      );
    } catch (error) {
      console.error("Error updating database: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end(); // Close the connection
    }
  }

  // Delete discount product by ID
  static async delete(id) {
    let connection;
    try {
      connection = await createDatabaseConnection();
      // Check if the product exists
      const discountProduct = await this.findById(id);
      if (!discountProduct) {
        throw new Error("Discount product not found");
      }

      await connection.query("DELETE FROM discount_product WHERE id = ?", [id]);
    } catch (error) {
      console.error("Error deleting from database: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end(); // Close the connection
    }
  }
}

module.exports = DiscountProduct;
