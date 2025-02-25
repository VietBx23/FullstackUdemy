const express = require("express");
const router = express.Router();
const AuthoritiesController = require("../controllers/authorities.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Authority:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID của authority
 *         username:
 *           type: string
 *           description: Tên đăng nhập của tài khoản (từ bảng users)
 *         roleId:
 *           type: string
 *           description: ID của role (từ bảng roles)
 *       required:
 *         - username
 *         - roleId
 *       example:
 *         id: 1
 *         username: "admin"
 *         roleId: "ADMI"
 */

/**
 * @swagger
 * tags:
 *   name: Authorities
 *   description: API quản lý phân quyền (liên kết giữa users và roles)
 */

/**
 * @swagger
 * /authorities:
 *   get:
 *     summary: Lấy tất cả authorities
 *     tags: [Authorities]
 *     responses:
 *       200:
 *         description: Danh sách authorities được trả về thành công
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
 *                     $ref: '#/components/schemas/Authority'
 *                 message:
 *                   type: string
 *       500:
 *         description: Lỗi server
 */
router.get("/", AuthoritiesController.getAllAuthorities);

/**
 * @swagger
 * /authorities/{id}:
 *   get:
 *     summary: Lấy authority theo ID
 *     tags: [Authorities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của authority
 *     responses:
 *       200:
 *         description: Authority được trả về thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Authority'
 *                 message:
 *                   type: string
 *       400:
 *         description: ID không hợp lệ
 *       404:
 *         description: Authority không tìm thấy
 *       500:
 *         description: Lỗi server
 */
router.get("/:id", AuthoritiesController.getAuthorityById);

/**
 * @swagger
 * /authorities:
 *   post:
 *     summary: Tạo authority mới
 *     tags: [Authorities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               roleId:
 *                 type: string
 *             required:
 *               - username
 *               - roleId
 *     responses:
 *       201:
 *         description: Authority được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Authority'
 *                 message:
 *                   type: string
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post("/", AuthoritiesController.createAuthority);

/**
 * @swagger
 * /authorities/{id}:
 *   put:
 *     summary: Cập nhật authority
 *     tags: [Authorities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của authority
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               roleId:
 *                 type: string
 *             required:
 *               - username
 *               - roleId
 *     responses:
 *       200:
 *         description: Authority được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Authority'
 *                 message:
 *                   type: string
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       404:
 *         description: Authority không tìm thấy
 *       500:
 *         description: Lỗi server
 */
router.put("/:id", AuthoritiesController.updateAuthority);

/**
 * @swagger
 * /authorities/{id}:
 *   delete:
 *     summary: Xóa authority
 *     tags: [Authorities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của authority
 *     responses:
 *       200:
 *         description: Authority được xóa thành công
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
 *         description: Authority không tìm thấy
 *       500:
 *         description: Lỗi server
 */
router.delete("/:id", AuthoritiesController.deleteAuthority);

module.exports = router;
