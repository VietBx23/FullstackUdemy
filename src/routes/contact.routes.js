const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID của contact
 *         fullname:
 *           type: string
 *           description: Họ và tên của người liên hệ
 *         email:
 *           type: string
 *           description: Email của người liên hệ
 *         phone:
 *           type: string
 *           description: Số điện thoại của người liên hệ
 *         message:
 *           type: string
 *           description: Nội dung tin nhắn của người liên hệ
 *         create_date:
 *           type: string
 *           format: date-time
 *           description: Ngày tạo thông tin liên hệ
 *       required:
 *         - fullname
 *         - email
 *         - phone
 *         - message
 *       example:
 *         id: 1
 *         fullname: "Nguyen Van A"
 *         email: "nguyenvana@example.com"
 *         phone: "0987654321"
 *         message: "Tôi cần hỗ trợ thông tin về sản phẩm."
 *         create_date: "2024-12-06T08:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API quản lý thông tin liên hệ
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: "Lấy danh sách tất cả thông tin liên hệ"
 *     tags: [Contacts]
 *     description: "Trả về danh sách tất cả các thông tin liên hệ."
 *     responses:
 *       200:
 *         description: "Danh sách thông tin liên hệ"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get("/", contactController.getAllContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: "Lấy thông tin liên hệ theo ID"
 *     tags: [Contacts]
 *     description: "Trả về thông tin liên hệ của một người dùng với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của thông tin liên hệ.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Thông tin liên hệ"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: "Không tìm thấy thông tin liên hệ"
 */
router.get("/:id", contactController.getContactById);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: "Tạo mới thông tin liên hệ"
 *     tags: [Contacts]
 *     description: "Tạo mới một thông tin liên hệ với dữ liệu được cung cấp."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: "Tạo mới thông tin liên hệ thành công"
 *       400:
 *         description: "Thông tin không hợp lệ"
 */
router.post("/", contactController.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: "Cập nhật thông tin liên hệ"
 *     tags: [Contacts]
 *     description: "Cập nhật thông tin liên hệ của một người dùng với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của thông tin liên hệ.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: "Cập nhật thông tin liên hệ thành công"
 *       404:
 *         description: "Không tìm thấy thông tin liên hệ"
 */
router.put("/:id", contactController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: "Xóa thông tin liên hệ"
 *     tags: [Contacts]
 *     description: "Xóa thông tin liên hệ của người dùng với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của thông tin liên hệ cần xóa.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Xóa thông tin liên hệ thành công"
 *       404:
 *         description: "Không tìm thấy thông tin liên hệ"
 */
router.delete("/:id", contactController.deleteContact);

module.exports = router;
