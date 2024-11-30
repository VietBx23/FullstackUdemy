const createDatabaseConnection = require("../config/database");
const bcrypt = require("bcryptjs"); // Dùng để mã hóa mật khẩu
const jwt = require("jsonwebtoken"); // Dùng để tạo và xác thực JWT
const transporter = require("../config/mail"); // Đảm bảo bạn đã cấu hình mail.js
const crypto = require("crypto"); // Để tạo mã reset mật khẩu
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

  // Tạo mới người dùng (mã hóa mật khẩu)
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

      // Băm mật khẩu trước khi lưu vào DB
      const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await connection.query(
        "INSERT INTO users (username, password, email, fullname, image, jwt_token, token_expires_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          username,
          hashedPassword,
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

  // Cập nhật thông tin người dùng (mã hóa mật khẩu nếu có thay đổi)
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

      let updatedFields = [
        username,
        email,
        fullname,
        image,
        jwt_token,
        token_expires_at,
        id,
      ];

      let query =
        "UPDATE users SET username = ?, email = ?, fullname = ?, image = ?, jwt_token = ?, token_expires_at = ? WHERE id = ?";

      // Kiểm tra nếu mật khẩu có thay đổi thì băm mật khẩu và thêm vào truy vấn
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        query =
          "UPDATE users SET username = ?, password = ?, email = ?, fullname = ?, image = ?, jwt_token = ?, token_expires_at = ? WHERE id = ?";
        updatedFields = [
          username,
          hashedPassword,
          email,
          fullname,
          image,
          jwt_token,
          token_expires_at,
          id,
        ];
      }

      await connection.query(query, updatedFields);
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

  // Đăng ký tài khoản (băm mật khẩu)
  static async signup(user) {
    const { username, password, email, fullname, image } = user;
    let connection;

    try {
      connection = await createDatabaseConnection();

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await connection.query(
        "INSERT INTO users (username, password, email, fullname, image) VALUES (?, ?, ?, ?, ?)",
        [username, hashedPassword, email, fullname, image]
      );

      return result.insertId; // Trả về ID của người dùng mới
    } catch (error) {
      console.error("Error signing up user:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Đăng nhập và trả về token JWT
  static async login(username, password) {
    let connection;
    try {
      connection = await createDatabaseConnection();

      // Kiểm tra người dùng có tồn tại không
      const [rows] = await connection.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );

      const user = rows[0];
      if (!user) {
        throw new Error("User not found");
      }

      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      // Tạo JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION || "60m" }
      );

      // Cập nhật token và thời gian hết hạn
      const tokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 giờ
      await connection.query(
        "UPDATE users SET jwt_token = ?, token_expires_at = ? WHERE id = ?",
        [token, tokenExpiresAt, user.id]
      );

      return { token, tokenExpiresAt, user };
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  static async forgotPassword(username, email) {
    let connection;
    try {
      connection = await createDatabaseConnection();

      // Kiểm tra sự tồn tại của username và email
      const [rows] = await connection.query(
        "SELECT * FROM users WHERE username = ? AND email = ?",
        [username, email]
      );

      if (rows.length === 0) {
        throw new Error("Username hoặc email không đúng.");
      }

      const user = rows[0];

      // Mật khẩu mặc định
      const defaultPassword = "Aa@Abc@";

      // Băm mật khẩu mặc định
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      // Cập nhật mật khẩu mới vào cơ sở dữ liệu
      await connection.query("UPDATE users SET password = ? WHERE id = ?", [
        hashedPassword,
        user.id,
      ]);

      // Gửi email thông báo mật khẩu mặc định
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Mật khẩu của bạn đã được reset",
        text: `Mật khẩu của bạn đã được reset thành công. Mật khẩu mới của bạn là: ${defaultPassword}`,
      };

      await transporter.sendMail(mailOptions);

      return "Mật khẩu đã được cập nhật và email đã được gửi!";
    } catch (error) {
      console.error("Error in forgotPassword:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Cập nhật mật khẩu sạc cho người dùng
  static async updateChargePassword(username, oldPassword, newChargePassword) {
    let connection;
    try {
      connection = await createDatabaseConnection();

      // Lấy thông tin người dùng theo username
      const [user] = await connection.query(
        "SELECT id, password FROM users WHERE username = ?",
        [username]
      );
      if (!user || user.length === 0) {
        throw new Error("Người dùng không tồn tại.");
      }

      // Kiểm tra mật khẩu cũ có khớp không
      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        user[0].password
      );
      if (!isPasswordValid) {
        throw new Error("Mật khẩu cũ không đúng.");
      }

      // Băm mật khẩu mới
      const hashedChargePassword = await bcrypt.hash(newChargePassword, 10);

      // Cập nhật mật khẩu sạc vào cơ sở dữ liệu
      await connection.query(
        "UPDATE users SET charge_password = ? WHERE id = ?",
        [hashedChargePassword, user[0].id]
      );

      return { message: "Charge password updated successfully" };
    } catch (error) {
      console.error("Error updating charge password:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  static async logout(userId) {
    let connection;
    try {
      connection = await createDatabaseConnection();

      // Xóa JWT token và thời gian hết hạn trong cơ sở dữ liệu
      await connection.query(
        "UPDATE users SET jwt_token = NULL, token_expires_at = NULL WHERE id = ?",
        [userId]
      );

      return { message: "Logged out successfully" };
    } catch (error) {
      console.error("Error logging out:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
}

module.exports = User;
