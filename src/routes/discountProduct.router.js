const express = require("express");
const router = express.Router();
const discountProductController = require("../controllers/discountProduct.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     DiscountProduct:
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
 *   name: DiscountProducts
 *   description: API quản lý sản phẩm khuyến mãi
 */

/**
 * @swagger
 * /discount-products:
 *   get:
 *     summary: "Lấy danh sách tất cả sản phẩm khuyến mãi"
 *     tags: [DiscountProducts]
 *     description: "Trả về danh sách tất cả các sản phẩm khuyến mãi."
 *     responses:
 *       200:
 *         description: "Danh sách sản phẩm khuyến mãi"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DiscountProduct'
 */
router.get("/", discountProductController.getAllDiscountProducts);

/**
 * @swagger
 * /discount-products/{id}:
 *   get:
 *     summary: "Lấy thông tin sản phẩm khuyến mãi theo ID"
 *     tags: [DiscountProducts]
 *     description: "Trả về thông tin sản phẩm khuyến mãi với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm khuyến mãi.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Thông tin sản phẩm khuyến mãi"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DiscountProduct'
 *       404:
 *         description: "Không tìm thấy sản phẩm khuyến mãi"
 */
router.get("/:id", discountProductController.getDiscountProductById);

/**
 * @swagger
 * /discount-products:
 *   post:
 *     summary: "Tạo mới sản phẩm khuyến mãi"
 *     tags: [DiscountProducts]
 *     description: "Tạo mới một sản phẩm khuyến mãi với thông tin được cung cấp."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiscountProduct'
 *     responses:
 *       201:
 *         description: "Tạo mới sản phẩm khuyến mãi thành công"
 *       400:
 *         description: "Thông tin không hợp lệ"
 */
router.post("/", discountProductController.createDiscountProduct);

/**
 * @swagger
 * /discount-products/{id}:
 *   put:
 *     summary: "Cập nhật sản phẩm khuyến mãi"
 *     tags: [DiscountProducts]
 *     description: "Cập nhật thông tin sản phẩm khuyến mãi với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm khuyến mãi.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiscountProduct'
 *     responses:
 *       200:
 *         description: "Cập nhật sản phẩm khuyến mãi thành công"
 *       404:
 *         description: "Không tìm thấy sản phẩm khuyến mãi"
 */
router.put("/:id", discountProductController.updateDiscountProduct);

/**
 * @swagger
 * /discount-products/{id}:
 *   delete:
 *     summary: "Xóa sản phẩm khuyến mãi"
 *     tags: [DiscountProducts]
 *     description: "Xóa sản phẩm khuyến mãi với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm khuyến mãi cần xóa.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Xóa sản phẩm khuyến mãi thành công"
 *       404:
 *         description: "Không tìm thấy sản phẩm khuyến mãi"
 */
router.delete("/:id", discountProductController.deleteDiscountProduct);

module.exports = router;
