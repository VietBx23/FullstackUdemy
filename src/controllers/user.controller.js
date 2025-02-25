const User = require("../models/user.model");

class UserController {
  // Lấy tất cả người dùng
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching users", error: error.message });
    }
  }

  // Lấy người dùng theo ID
  static async getUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.getUserById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching user", error: error.message });
    }
  }

  // Tạo người dùng mới
  static async createUser(req, res) {
    const {
      username,
      password,
      email,
      fullname,
      image,
      jwt_token,
      token_expires_at,
    } = req.body;
    try {
      const userId = await User.createUser({
        username,
        password,
        email,
        fullname,
        image,
        jwt_token,
        token_expires_at,
      });
      res.status(201).json({ message: "User created successfully", userId });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating user", error: error.message });
    }
  }

  // Cập nhật thông tin người dùng
  static async updateUser(req, res) {
    const { id } = req.params;
    const {
      username,
      password,
      email,
      fullname,
      image,
      jwt_token,
      token_expires_at,
    } = req.body;
    try {
      await User.updateUser(id, {
        username,
        password,
        email,
        fullname,
        image,
        jwt_token,
        token_expires_at,
      });
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating user", error: error.message });
    }
  }

  // Xóa người dùng
  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await User.deleteUser(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting user", error: error.message });
    }
  }

  // Đăng ký tài khoản
  static async signup(req, res) {
    const { username, password, email, fullname, image } = req.body;
    try {
      const userId = await User.signup({
        username,
        password,
        email,
        fullname,
        image,
      });
      res.status(201).json({ message: "User registered successfully", userId });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  }

  // Đăng nhập
  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const { token, tokenExpiresAt, user } = await User.login(
        username,
        password
      );
      res.status(200).json({ token, tokenExpiresAt, user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error logging in", error: error.message });
    }
  }

  static async forgotPassword(req, res) {
    const { username, email } = req.body;

    try {
      const message = await User.forgotPassword(username, email);
      res.status(200).json({ message });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Cập nhật mật khẩu sạc cho người dùng
  static async updateChargePassword(req, res) {
    const { username, oldPassword, newChargePassword } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!username || !oldPassword || !newChargePassword) {
      return res.status(400).json({
        message:
          "Vui lòng cung cấp đầy đủ thông tin (username, mật khẩu cũ, mật khẩu mới).",
      });
    }

    try {
      // Kiểm tra người dùng tồn tại và mật khẩu cũ đúng
      const result = await User.updateChargePassword(
        username,
        oldPassword,
        newChargePassword
      );
      res.status(200).json(result);
    } catch (error) {
      if (
        error.message === "Người dùng không tồn tại." ||
        error.message === "Mật khẩu cũ không đúng."
      ) {
        res.status(400).json({
          message: error.message,
        });
      } else {
        res.status(500).json({
          message: "Lỗi khi cập nhật mật khẩu sạc",
          error: error.message,
        });
      }
    }
  }

  static logout = async (req, res) => {
    try {
      // Lấy userId từ thông tin người dùng đã đăng nhập (giả sử đã có trong token hoặc session)
      const userId = req.user.id; // Giả sử bạn có middleware để xác thực và gắn user vào request

      // Gọi model User để xử lý đăng xuất
      const result = await User.logout(userId);

      // Trả về kết quả
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in logout controller:", error.message);
      res.status(500).json({ error: "Something went wrong during logout" });
    }
  };
  static async googleLogin(req, res) {
    const { idToken } = req.body;

    try {
      if (!idToken) {
        return res.status(400).json({ message: "idToken is required" });
      }

      const result = await User.loginWithGoogle(idToken);
      res.json({
        token: result.token,
        tokenExpiresAt: result.tokenExpiresAt,
        user: {
          id: result.user.id,
          username: result.user.username,
          email: result.user.email,
          fullname: result.user.fullname, // Đồng bộ với model
          image: result.user.image,
          googleId: result.user.googleId,
          jwt_token: result.user.jwt_token, // Trùng với token ở trên nhưng giữ cho đầy đủ
          token_expires_at: result.user.token_expires_at,
        },
      });
    } catch (error) {
      console.error("Controller error:", error.message); // Thêm log để debug
      res.status(401).json({ message: error.message || "Google login failed" });
    }
  }
}

module.exports = UserController;
