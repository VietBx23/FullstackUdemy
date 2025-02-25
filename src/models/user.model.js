const createDatabaseConnection = require("../config/database");
const bcrypt = require("bcryptjs"); // Dùng để mã hóa mật khẩu
const jwt = require("jsonwebtoken"); // Dùng để tạo và xác thực JWT
const transporter = require("../config/mail"); // Đảm bảo bạn đã cấu hình mail.js
const crypto = require("crypto"); // Để tạo mã reset mật khẩu
const axios = require("axios"); // Thêm dòng này
const { OAuth2Client } = require("google-auth-library"); // Thêm Google Auth
const GOOGLE_CLIENT_ID =
  "965256866011-jlh1kddr9q0o3177hhf91s20bbdd0o90.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

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
  static async loginWithGoogle(idToken) {
    let connection;
    try {
      // Xác thực idToken với Google
      console.log("Received idToken:", idToken);
      const ticket = await client.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      console.log("Google payload:", payload);

      // Lấy dữ liệu từ Google
      const userData = {
        googleId: payload.sub,
        email: payload.email,
        fullname: payload.name || "Unknown", // Nếu không có name, dùng mặc định
        image: payload.picture || "", // Nếu không có picture, để trống
        username: payload.email.split("@")[0], // Tự tạo username từ email
        password: null, // Không cần password cho Google Login
      };
      console.log("User data to save:", userData);

      connection = await createDatabaseConnection();
      console.log("Database connected");

      // Kiểm tra user tồn tại (dựa trên googleId hoặc email)
      const [rows] = await connection.query(
        "SELECT * FROM users WHERE googleId = ? OR email = ?",
        [userData.googleId, userData.email]
      );
      console.log("Query result (existing user):", rows);

      let user;
      if (rows.length > 0) {
        // User đã tồn tại
        user = rows[0];
        console.log("User found:", user);
      } else {
        // Thêm user mới với tất cả các trường
        const [result] = await connection.query(
          "INSERT INTO users (username, password, email, fullname, image, googleId, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
          [
            userData.username,
            userData.password, // NULL vì không dùng mật khẩu
            userData.email,
            userData.fullname,
            userData.image,
            userData.googleId,
          ]
        );
        console.log("Insert result:", result);
        user = { id: result.insertId, ...userData };
      }

      // Tạo JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "my-secret-key", // Dùng mặc định nếu không có .env
        { expiresIn: process.env.JWT_EXPIRATION || "1h" }
      );
      const tokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 giờ

      // Cập nhật token và thời gian hết hạn
      await connection.query(
        "UPDATE users SET jwt_token = ?, token_expires_at = ? WHERE id = ?",
        [token, tokenExpiresAt, user.id]
      );
      console.log("Token updated for user ID:", user.id);

      // Trả về thông tin đầy đủ
      return {
        token,
        tokenExpiresAt,
        user: {
          id: user.id,
          username: userData.username,
          email: userData.email,
          fullname: userData.fullname,
          image: userData.image,
          googleId: userData.googleId,
          jwt_token: token,
          token_expires_at: tokenExpiresAt,
        },
      };
    } catch (error) {
      console.error("Error in Google login:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
  static async loginWithFacebook(accessToken) {
    let connection;
    try {
      console.log("Received Facebook accessToken:", accessToken);

      // Gọi Facebook Graph API để lấy thông tin user
      const response = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
      );
      const payload = response.data;
      console.log("Facebook payload:", payload);

      // Xử lý dữ liệu từ Facebook
      const userData = {
        facebookId: payload.id,
        email: payload.email || `${payload.id}@facebook.com`, // Mặc định nếu không có email
        fullname: payload.name || "Facebook User",
        image: payload.picture?.data?.url || "",
        username: payload.email
          ? payload.email.split("@")[0]
          : `fb_${payload.id}`,
        password: null, // Không cần mật khẩu
      };
      console.log("User data to save:", userData);

      connection = await createDatabaseConnection();
      console.log("Database connected");

      // Kiểm tra user tồn tại
      const [rows] = await connection.query(
        "SELECT * FROM users WHERE facebookId = ? OR email = ?",
        [userData.facebookId, userData.email]
      );
      console.log("Query result (existing user):", rows);

      let user;
      if (rows.length > 0) {
        user = rows[0];
        console.log("User found:", user);
      } else {
        const [result] = await connection.query(
          "INSERT INTO users (username, password, email, fullname, image, facebookId, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
          [
            userData.username,
            userData.password,
            userData.email,
            userData.fullname,
            userData.image,
            userData.facebookId,
          ]
        );
        console.log("Insert result:", result);
        user = { id: result.insertId, ...userData };
      }

      // Tạo JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "my-secret-key",
        { expiresIn: "1h" }
      );
      const tokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 giờ

      // Cập nhật token
      await connection.query(
        "UPDATE users SET jwt_token = ?, token_expires_at = ? WHERE id = ?",
        [token, tokenExpiresAt, user.id]
      );
      console.log("Token updated for user ID:", user.id);

      return {
        token,
        tokenExpiresAt,
        user: {
          id: user.id,
          username: userData.username,
          email: userData.email,
          fullname: userData.fullname,
          image: userData.image,
          facebookId: userData.facebookId,
          jwt_token: token,
          token_expires_at: tokenExpiresAt,
        },
      };
    } catch (error) {
      console.error("Error in Facebook login:", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }
}

module.exports = User;
