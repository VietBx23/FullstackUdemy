const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID của tài khoản
 *         username:
 *           type: string
 *           description: Tên đăng nhập của tài khoản
 *         fullname:
 *           type: string
 *           description: Họ và tên của người dùng
 *         password:
 *           type: string
 *           description: Mật khẩu của tài khoản (ẩn trên response)
 *       required:
 *         - username
 *         - password
 *       example:
 *         id: 1
 *         username: "user01"
 *         fullname: "Nguyen Van A"
 *         password: "password123"
 */

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: API quản lý tài khoản
 */

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: "Lấy danh sách tất cả tài khoản"
 *     tags: [Accounts]
 *     description: "Trả về danh sách tất cả các tài khoản."
 *     responses:
 *       200:
 *         description: "Danh sách tài khoản"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 */
router.get("/", accountController.getAllAccounts);

/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     summary: "Lấy thông tin tài khoản theo ID"
 *     tags: [Accounts]
 *     description: "Trả về thông tin tài khoản của một user với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của tài khoản.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Thông tin tài khoản"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: "Không tìm thấy tài khoản"
 */
router.get("/:id", accountController.getAccountById);

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: "Tạo mới tài khoản"
 *     tags: [Accounts]
 *     description: "Tạo mới một tài khoản với thông tin được cung cấp."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       201:
 *         description: "Tạo mới tài khoản thành công"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       400:
 *         description: "Thông tin không hợp lệ"
 */
router.post("/", accountController.createAccount);

/**
 * @swagger
 * /accounts/{id}:
 *   put:
 *     summary: "Cập nhật tài khoản"
 *     tags: [Accounts]
 *     description: "Cập nhật thông tin tài khoản của một user với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của tài khoản.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       200:
 *         description: "Cập nhật tài khoản thành công"
 *       404:
 *         description: "Không tìm thấy tài khoản"
 */
router.put("/:id", accountController.updateAccount);

/**
 * @swagger
 * /accounts/{id}:
 *   delete:
 *     summary: "Xóa tài khoản"
 *     tags: [Accounts]
 *     description: "Xóa tài khoản của user với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của tài khoản cần xóa.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Xóa tài khoản thành công"
 *       404:
 *         description: "Không tìm thấy tài khoản"
 */
router.delete("/:id", accountController.deleteAccount);

module.exports = router;
