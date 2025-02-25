const Authorities = require("../models/authorities.model");

class AuthoritiesController {
  // [GET] /authorities - Lấy tất cả authorities
  static async getAllAuthorities(req, res) {
    try {
      const authorities = await Authorities.findAll();
      return res.status(200).json({
        success: true,
        data: authorities,
        message: "Authorities retrieved successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Failed to fetch authorities: ${error.message}`,
      });
    }
  }

  // [GET] /authorities/:id - Lấy authority theo ID
  static async getAuthorityById(req, res) {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid authority ID",
      });
    }
    try {
      const authority = await Authorities.findById(id);
      if (!authority) {
        return res.status(404).json({
          success: false,
          message: `Authority with ID ${id} not found`,
        });
      }
      return res.status(200).json({
        success: true,
        data: authority,
        message: "Authority retrieved successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Failed to fetch authority: ${error.message}`,
      });
    }
  }

  // [POST] /authorities - Tạo authority mới
  static async createAuthority(req, res) {
    const { username, roleId } = req.body;
    if (
      !username ||
      !roleId ||
      typeof username !== "string" ||
      typeof roleId !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Username and roleId are required and must be strings",
      });
    }
    try {
      const authorityData = { username, roleId };
      const newAuthority = await Authorities.create(authorityData);
      return res.status(201).json({
        success: true,
        data: newAuthority,
        message: "Authority created successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `Failed to create authority: ${error.message}`,
      });
    }
  }

  // [PUT] /authorities/:id - Cập nhật authority
  static async updateAuthority(req, res) {
    const { id } = req.params;
    const { username, roleId } = req.body;
    if (!id || isNaN(id) || !username || !roleId) {
      return res.status(400).json({
        success: false,
        message: "ID, username, and roleId are required",
      });
    }
    try {
      const authorityData = { username, roleId };
      const updated = await Authorities.update(id, authorityData);
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: `Authority with ID ${id} not found`,
        });
      }
      return res.status(200).json({
        success: true,
        data: { id, username, roleId },
        message: "Authority updated successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `Failed to update authority: ${error.message}`,
      });
    }
  }

  // [DELETE] /authorities/:id - Xóa authority
  static async deleteAuthority(req, res) {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid authority ID",
      });
    }
    try {
      const deleted = await Authorities.delete(id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: `Authority with ID ${id} not found`,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Authority deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Failed to delete authority: ${error.message}`,
      });
    }
  }
}

module.exports = AuthoritiesController;
