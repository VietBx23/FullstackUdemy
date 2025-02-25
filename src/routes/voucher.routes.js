const express = require("express");
const router = express.Router();
const VoucherController = require("../controllers/voucher.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Voucher:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID của sản phẩm khuyến mãi
 *         code:
 *           type: string
 *           description: Mã khuyến mãi
 *         discount_amount:
 *           type: number
 *           format: float
 *           description: Số tiền giảm giá
 *         quantity:
 *           type: integer
 *           description: Số lượng
 *         start_date:
 *           type: string
 *           format: date
 *           description: Ngày bắt đầu áp dụng
 *         end_date:
 *           type: string
 *           format: date
 *           description: Ngày kết thúc áp dụng
 *         activate:
 *           type: boolean
 *           description: Trạng thái kích hoạt
 *       required:
 *         - code
 *         - discount_amount
 *         - quantity
 *         - start_date
 *         - end_date
 *         - activate
 *       example:
 *         id: 1
 *         code: "DISCOUNT2024"
 *         discount_amount: 50.0
 *         quantity: 100
 *         start_date: "2024-12-01"
 *         end_date: "2024-12-31"
 *         activate: true
 */

/**
 * @swagger
 * tags:
 *   name: Vouchers
 *   description: API quản lý sản mã giảm giá
 */

/**
 * @swagger
 * /vouchers:
 *   get:
 *     summary: "Lấy danh sách tất cả mã giảm giá"
 *     tags: [Vouchers]
 *     description: "Trả về danh sách tất cả các mã giảm giá."
 *     responses:
 *       200:
 *         description: "Danh sách mã giảm giá"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Voucher'
 */
router.get("/", VoucherController.getAllVouchers);

/**
 * @swagger
 * /vouchers/{id}:
 *   get:
 *     summary: "Lấy thông tin mã giảm giá theo ID"
 *     tags: [Vouchers]
 *     description: "Trả về thông tin mã giảm giá với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của mã giảm giá.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Thông tin mã giảm giá"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voucher'
 *       404:
 *         description: "Không tìm thấy mã giảm giá"
 */
router.get("/:id", VoucherController.getVoucherById);

/**
 * @swagger
 * /vouchers:
 *   post:
 *     summary: "Tạo mới mã giảm giá"
 *     tags: [Vouchers]
 *     description: "Tạo mới một mã giảm giá với thông tin được cung cấp."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Voucher'
 *     responses:
 *       201:
 *         description: "Tạo mới mã giảm giá thành công"
 *       400:
 *         description: "Thông tin mã giảm giá không hợp lệ"
 */
router.post("/", VoucherController.createvoucher);

/**
 * @swagger
 * /vouchers/{id}:
 *   put:
 *     summary: "Cập nhật mã giảm giá"
 *     tags: [Vouchers]
 *     description: "Cập nhật thông tin mã giảm giá với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của mã giảm giá.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Voucher'
 *     responses:
 *       200:
 *         description: "Cập nhật mã giảm giá thành công"
 *       404:
 *         description: "Không tìm thấy mã giảm giá"
 */
router.put("/:id", VoucherController.updatevoucher);

/**
 * @swagger
 * /vouchers/{id}:
 *   delete:
 *     summary: "Xóa mã giảm giá"
 *     tags: [Vouchers]
 *     description: "Xóa mã giảm giá với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của mã giảm giá cần xóa.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Xóa mã giảm giá thành công"
 *       404:
 *         description: "Không tìm thấy mã giảm giá"
 */
router.delete("/:id", VoucherController.deletevoucher);

module.exports = router;
