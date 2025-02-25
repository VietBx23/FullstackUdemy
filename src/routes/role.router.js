const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/role.controller"); // Đảm bảo đường dẫn đúng

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API quản lý roles
 */
/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Lấy tất cả roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Danh sách roles được trả về thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Lỗi server
 */
router.get("/", RoleController.getAllRole);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Lấy role theo ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của role
 *     responses:
 *       200:
 *         description: Role được trả về thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: ID không hợp lệ
 *       404:
 *         description: Role không tìm thấy
 *       500:
 *         description: Lỗi server
 */
router.get("/:id", RoleController.getRoleById);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Tạo role mới
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - id
 *               - name
 *     responses:
 *       201:
 *         description: Role được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post("/", RoleController.createRole);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Cập nhật role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Role được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       404:
 *         description: Role không tìm thấy
 *       500:
 *         description: Lỗi server
 */
router.put("/:id", RoleController.updateRole);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Xóa role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của role
 *     responses:
 *       200:
 *         description: Role được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: ID không hợp lệ
 *       404:
 *         description: Role không tìm thấy
 *       500:
 *         description: Lỗi server
 */
router.delete("/:id", RoleController.deleteRole);

module.exports = router;
