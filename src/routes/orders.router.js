// routes/orders.router.js
const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders.controller");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API quản lý đơn hàng
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: "Tạo mới đơn hàng"
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               create_date:
 *                 type: string
 *               address:
 *                 type: string
 *               total_amount:
 *                 type: number
 *                 format: float
 *               available:
 *                 type: boolean
 *               status:
 *                 type: string
 *             required:
 *               - username
 *               - create_date
 *               - address
 *               - total_amount
 *               - available
 *               - status
 *     responses:
 *       201:
 *         description: "Order created successfully"
 *       500:
 *         description: "Failed to create order"
 */
router.post("/", ordersController.createOrder); // Tạo đơn hàng

/**
 * @swagger
 * /orders/{username}:
 *   get:
 *     summary: "Lấy danh sách đơn hàng của người dùng"
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Tên người dùng
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Danh sách đơn hàng"
 *       500:
 *         description: "Failed to fetch orders"
 */
router.get("/:username", ordersController.getOrders); // Lấy danh sách đơn hàng của người dùng

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: "Cập nhật trạng thái đơn hàng"
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đơn hàng
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Order status updated successfully"
 *       404:
 *         description: "Order not found"
 */
router.put("/:id", ordersController.updateOrderStatus); // Cập nhật trạng thái đơn hàng

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: "Xóa đơn hàng"
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đơn hàng cần xóa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Order deleted successfully"
 *       404:
 *         description: "Order not found"
 */
router.delete("/:id", ordersController.deleteOrder); // Xóa đơn hàng

module.exports = router;
