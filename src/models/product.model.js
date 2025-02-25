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
  static async getTop4NewProducts() {
    let connection;
    try {
      connection = await createDatabaseConnection();
      const [rows] = await connection.query(`
        SELECT 
            p.id,
            p.name,
            p.price,
            COALESCE(dp.percentage, 0) AS percentage,  -- Nếu không có giảm giá thì % = 0
            (p.price - (p.price * COALESCE(dp.percentage, 0) / 100)) AS discounted_price,
            (SELECT ip.image FROM imageProducts ip WHERE ip.product_id = p.id ORDER BY ip.id LIMIT 1) AS product_image
        FROM Products p
        LEFT JOIN discount_product dp ON p.id = dp.product_id AND dp.active = 1
            AND CURDATE() BETWEEN dp.start_date AND dp.end_date  
        ORDER BY p.id DESC
        LIMIT 4;
      `);

      console.log("Fetched products:", rows);
      return rows;
    } catch (error) {
      console.error("Error querying database:", error.message);
      throw error;
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

  static async findAllProductSale() {
    let connection;
    try {
      connection = await createDatabaseConnection();

      const query = `
        SELECT 
            p.id,
            p.name,
            p.price,
            dp.percentage,
            (p.price - (p.price * dp.percentage / 100)) AS discounted_price,
           
            MIN(ip.image) AS product_image
        FROM Products p
        JOIN discount_product dp ON p.id = dp.product_id
        LEFT JOIN imageProducts ip ON p.id = ip.product_id
        WHERE dp.active = 1
        AND CURDATE() BETWEEN dp.start_date AND dp.end_date
        GROUP BY p.id, p.name, p.price, dp.percentage, dp.start_date, dp.end_date
        ORDER BY dp.percentage DESC  -- Sắp xếp theo % giảm giá cao nhất
       
      `;

      const [rows] = await connection.query(query);
      return rows;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm giảm giá:", error);
      throw new Error("Không thể lấy danh sách sản phẩm giảm giá.");
    } finally {
      if (connection) await connection.end();
    }
  }

  static async top4ProductSale() {
    let connection;
    try {
      connection = await createDatabaseConnection();

      const query = `
        SELECT 
            p.id,
            p.name,
            p.price,
            dp.percentage,
            (p.price - (p.price * dp.percentage / 100)) AS discounted_price,
            MIN(ip.image) AS product_image
        FROM Products p
        JOIN discount_product dp ON p.id = dp.product_id
        LEFT JOIN imageProducts ip ON p.id = ip.product_id
        WHERE dp.active = 1
        AND CURDATE() BETWEEN dp.start_date AND dp.end_date
        GROUP BY p.id, p.name, p.price, dp.percentage, dp.start_date, dp.end_date
        ORDER BY dp.percentage DESC
        LIMIT 4;
      `;

      const [rows] = await connection.query(query);
      return rows;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm giảm giá:", error);
      throw new Error("Không thể lấy danh sách sản phẩm giảm giá.");
    } finally {
      if (connection) await connection.end();
    }
  }
}

module.exports = Product;
