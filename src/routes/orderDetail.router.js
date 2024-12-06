const express = require("express");
const router = express.Router();
const orderDetailController = require("../controllers/orderDetail.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID của chi tiết đơn hàng
 *         order_id:
 *           type: integer
 *           description: ID của đơn hàng
 *         product_id:
 *           type: integer
 *           description: ID của sản phẩm
 *         price:
 *           type: number
 *           format: float
 *           description: Giá của sản phẩm
 *         quantity:
 *           type: integer
 *           description: Số lượng sản phẩm
 *         size:
 *           type: integer
 *           description: Kích thước của sản phẩm
 *         color:
 *           type: string
 *           description: Màu sắc của sản phẩm
 *       required:
 *         - order_id
 *         - product_id
 *         - price
 *         - quantity
 *         - size
 *         - color
 *       example:
 *         id: 1
 *         order_id: 101
 *         product_id: 202
 *         price: 15.99
 *         quantity: 2
 *         size: 1
 *         color: "red"
 */

/**
 * @swagger
 * tags:
 *   name: OrderDetails
 *   description: API quản lý chi tiết đơn hàng
 */

/**
 * @swagger
 * /orderdetails:
 *   get:
 *     summary: "Lấy danh sách tất cả chi tiết đơn hàng"
 *     tags: [OrderDetails]
 *     description: "Trả về danh sách tất cả các chi tiết đơn hàng."
 *     responses:
 *       200:
 *         description: "Danh sách chi tiết đơn hàng"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderDetail'
 */
router.get("/", orderDetailController.getAllOrderDetails);

/**
 * @swagger
 * /orderdetails/{id}:
 *   get:
 *     summary: "Lấy thông tin chi tiết đơn hàng theo ID"
 *     tags: [OrderDetails]
 *     description: "Trả về thông tin chi tiết đơn hàng của một đơn hàng với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của chi tiết đơn hàng.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Thông tin chi tiết đơn hàng"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
 *       404:
 *         description: "Không tìm thấy chi tiết đơn hàng"
 */
router.get("/:id", orderDetailController.getOrderDetailById);
/**
 * @swagger
 * /orderdetails/{order_id}:
 *   get:
 *     summary: "Lấy thông tin chi tiết đơn hàng theo ID"
 *     tags: [OrderDetails]
 *     description: "Trả về thông tin chi tiết đơn hàng của một đơn hàng với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         description: ID của chi tiết đơn hàng.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Thông tin chi tiết đơn hàng"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
 *       404:
 *         description: "Không tìm thấy chi tiết đơn hàng"
 */

router.get("/:order_id", orderDetailController.getOrderDetailByOrder);
/**
 * @swagger
 * /orderdetails:
 *   post:
 *     summary: "Tạo mới chi tiết đơn hàng"
 *     tags: [OrderDetails]
 *     description: "Tạo mới một chi tiết đơn hàng với thông tin được cung cấp."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderDetail'
 *     responses:
 *       201:
 *         description: "Tạo mới chi tiết đơn hàng thành công"
 *       400:
 *         description: "Thông tin không hợp lệ"
 */
router.post("/", orderDetailController.createOrderDetail);

/**
 * @swagger
 * /orderdetails/{id}:
 *   put:
 *     summary: "Cập nhật chi tiết đơn hàng"
 *     tags: [OrderDetails]
 *     description: "Cập nhật thông tin chi tiết đơn hàng của một đơn hàng với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của chi tiết đơn hàng.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderDetail'
 *     responses:
 *       200:
 *         description: "Cập nhật chi tiết đơn hàng thành công"
 *       404:
 *         description: "Không tìm thấy chi tiết đơn hàng"
 */
router.put("/:id", orderDetailController.updateOrderDetail);

/**
 * @swagger
 * /orderdetails/{id}:
 *   delete:
 *     summary: "Xóa chi tiết đơn hàng"
 *     tags: [OrderDetails]
 *     description: "Xóa chi tiết đơn hàng của một đơn hàng với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của chi tiết đơn hàng cần xóa.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Xóa chi tiết đơn hàng thành công"
 *       404:
 *         description: "Không tìm thấy chi tiết đơn hàng"
 */
router.delete("/:id", orderDetailController.deleteOrderDetail);

module.exports = router;
