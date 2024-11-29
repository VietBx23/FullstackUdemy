// userRouter.js
const express = require("express");
const UserController = require("../controllers/user.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API quản lý người dùng
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: "Lấy danh sách tất cả người dùng"
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: "Danh sách người dùng"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/users", UserController.getAllUsers); // Lấy tất cả người dùng

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: "Lấy người dùng theo ID"
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Thông tin người dùng"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: "Không tìm thấy người dùng"
 */
router.get("/users/:id", UserController.getUser); // Lấy người dùng theo ID

/**
 * @swagger
 * /users:
 *   post:
 *     summary: "Tạo người dùng mới"
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: "Tạo người dùng thành công"
 *       400:
 *         description: "Thông tin không hợp lệ"
 */
router.post("/users", UserController.createUser); // Tạo người dùng mới

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: "Cập nhật người dùng"
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: "Cập nhật người dùng thành công"
 *       404:
 *         description: "Không tìm thấy người dùng"
 */
router.put("/users/:id", UserController.updateUser); // Cập nhật người dùng

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: "Xóa người dùng"
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần xóa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Xóa người dùng thành công"
 *       404:
 *         description: "Không tìm thấy người dùng"
 */
router.delete("/users/:id", UserController.deleteUser); // Xóa người dùng

module.exports = router;
