const Role = require("../models/role.model");

class RoleController {
  /**
   * [GET] /roles
   * lấy tất cả role từ database
   */

  static async getAllRole(req, res) {
    try {
      const roles = await Role.findAll();
      return res.status(200).json({
        success: true,
        data: roles,
        message: "Roles retrieved successfully!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch roles: ${error.message}",
      });
    }
  }

  /**
   * [GET] /roles/:id
   * Lấy role theo id
   */
  static async getRoleById(req, res) {
    const { id } = req.params;

    // Kiểm tra ID có hợp lệ không
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid role ID",
      });
    }

    try {
      const role = await Role.findById(id);
      if (!role) {
        return res.status(404).json({
          success: false,
          message: `Role with ID ${id} not found`,
        });
      }
      return res.status(200).json({
        success: true,
        data: role,
        message: "Role retrieved successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Failed to fetch role: ${error.message}`,
      });
    }
  }
  /**
   * [POST] /roles
   * Tạo một role mới
   */
  static async createRole(req, res) {
    const { id, name } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!id || !name || typeof id !== "string" || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "ID and name are required and must be strings",
      });
    }

    try {
      const roleData = { id, name };
      const newRole = await Role.create(roleData);
      return res.status(201).json({
        success: true,
        data: newRole,
        message: "Role created successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `Failed to create role: ${error.message}`,
      });
    }
  }
  /**
   * [PUT] /roles/:id
   * Cập nhật một role
   */
  static async updateRole(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!id || !name || typeof id !== "string" || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "ID and name are required and must be strings",
      });
    }

    try {
      const roleData = { name };
      const updated = await Role.update(id, roleData);
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: `Role with ID ${id} not found`,
        });
      }
      return res.status(200).json({
        success: true,
        data: { id, name },
        message: "Role updated successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `Failed to update role: ${error.message}`,
      });
    }
  }

  /**
   * [DELETE] /roles/:id
   * Xóa một role theo ID
   */
  static async deleteRole(req, res) {
    const { id } = req.params;

    // Kiểm tra ID có hợp lệ không
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid role ID",
      });
    }

    try {
      const deleted = await Role.delete(id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: `Role with ID ${id} not found`,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Role deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Failed to delete role: ${error.message}`,
      });
    }
  }
}
module.exports = RoleController;
