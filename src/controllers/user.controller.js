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
}

module.exports = UserController;
