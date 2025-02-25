const express = require("express");
const router = express.Router();
const DiscountController = require("../controllers/discountProduct.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     DiscountProduct:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID của sản phẩm giảm giá
 *         product_id:
 *           type: integer
 *           description: ID của sản phẩm
 *         start_date:
 *           type: string
 *           format: date
 *           description: Ngày bắt đầu áp dụng
 *         end_date:
 *           type: string
 *           format: date
 *           description: Ngày kết thúc áp dụng
 *         percentage:
 *           type: number
 *           format: float
 *           description: Phần trăm giảm giá
 *         active:
 *           type: boolean
 *           description: Trạng thái kích hoạt
 *       required:
 *         - product_id
 *         - start_date
 *         - end_date
 *         - percentage
 *         - active
 *       example:
 *         id: 1
 *         product_id: 101
 *         start_date: "2024-10-01"
 *         end_date: "2024-10-31"
 *         percentage: 20.0
 *         active: true
 */

/**
 * @swagger
 * tags:
 *   name: DiscountProducts
 *   description: API quản lý sản phẩm giảm giá
 */

/**
 * @swagger
 * /discount-products:
 *   get:
 *     summary: "Lấy danh sách tất cả sản phẩm giảm giá"
 *     tags: [DiscountProducts]
 *     responses:
 *       200:
 *         description: "Danh sách sản phẩm giảm giá"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DiscountProduct'
 */
router.get("/", DiscountController.getAllDiscountProducts);

/**
 * @swagger
 * /discount-products/{id}:
 *   get:
 *     summary: "Lấy thông tin sản phẩm giảm giá theo ID"
 *     tags: [DiscountProducts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Thông tin sản phẩm giảm giá"
 *       404:
 *         description: "Không tìm thấy sản phẩm giảm giá"
 */
router.get("/:id", DiscountController.getDiscountProductById);

/**
 * @swagger
 * /discount-products:
 *   post:
 *     summary: "Tạo mới sản phẩm giảm giá"
 *     tags: [DiscountProducts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiscountProduct'
 *     responses:
 *       201:
 *         description: "Tạo mới sản phẩm giảm giá thành công"
 *       400:
 *         description: "Thông tin sản phẩm giảm giá không hợp lệ"
 */
router.post("/", DiscountController.createDiscountProduct);

/**
 * @swagger
 * /discount-products/{id}:
 *   put:
 *     summary: "Cập nhật sản phẩm giảm giá"
 *     tags: [DiscountProducts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *         description: "Cập nhật sản phẩm giảm giá thành công"
 *       404:
 *         description: "Không tìm thấy sản phẩm giảm giá"
 */
router.put("/:id", DiscountController.updateDiscountProduct);

/**
 * @swagger
 * /discount-products/{id}:
 *   delete:
 *     summary: "Xóa sản phẩm giảm giá"
 *     tags: [DiscountProducts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Xóa sản phẩm giảm giá thành công"
 *       404:
 *         description: "Không tìm thấy sản phẩm giảm giá"
 */
router.delete("/:id", DiscountController.deleteDiscountProduct);

module.exports = router;
