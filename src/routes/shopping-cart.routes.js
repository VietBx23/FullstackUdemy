const express = require("express");
const router = express.Router();
const shoppingCartController = require("../controllers/shopping-cart.controler");

/**
 * @swagger
 * tags:
 *   name: shopping-cart
 *   description: API quản lý giỏ hàng
 */

/**
 * @swagger
 * /shopping-cart/{username}:
 *   get:
 *     summary: Lấy giỏ hàng của người dùng
 *     tags: [ShoppingCart]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Tên đăng nhập của người dùng
 *     responses:
 *       200:
 *         description: Giỏ hàng của người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShoppingCartItem'
 */
router.get("/:username", shoppingCartController.getCartByUsername); // Lấy giỏ hàng của người dùng

/**
 * @swagger
 * /shopping-cart:
 *   post:
 *     summary: Thêm sản phẩm vào giỏ hàng
 *     tags: [ShoppingCart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Tên đăng nhập của người dùng
 *               product_id:
 *                 type: integer
 *                 description: ID của sản phẩm
 *               image:
 *                 type: string
 *                 description: Đường dẫn ảnh của sản phẩm
 *               size:
 *                 type: string
 *                 description: Kích thước của sản phẩm
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Giá của sản phẩm
 *               qty:
 *                 type: integer
 *                 description: Số lượng của sản phẩm
 *               total:
 *                 type: number
 *                 format: float
 *                 description: Tổng giá trị của sản phẩm trong giỏ
 *     responses:
 *       201:
 *         description: Sản phẩm đã được thêm vào giỏ hàng
 */
router.post("/", shoppingCartController.addToCart); // Thêm sản phẩm vào giỏ hàng

/**
 * @swagger
 * /shopping-cart/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm trong giỏ hàng
 *     tags: [ShoppingCart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của sản phẩm trong giỏ hàng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               qty:
 *                 type: integer
 *                 description: Số lượng mới của sản phẩm
 *               total:
 *                 type: number
 *                 format: float
 *                 description: Tổng giá trị mới của sản phẩm trong giỏ
 *     responses:
 *       200:
 *         description: Sản phẩm đã được cập nhật
 */
router.put("/:id", shoppingCartController.updateCartItem); // Cập nhật sản phẩm trong giỏ hàng

/**
 * @swagger
 * /shopping-cart/{id}:
 *   delete:
 *     summary: Xóa sản phẩm khỏi giỏ hàng
 *     tags: [ShoppingCart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của sản phẩm trong giỏ hàng
 *     responses:
 *       200:
 *         description: Sản phẩm đã được xóa khỏi giỏ hàng
 */
router.delete("/:id", shoppingCartController.deleteFromCart); // Xóa sản phẩm khỏi giỏ hàng

/**
 * @swagger
 * /shopping-cart/clear/{username}:
 *   delete:
 *     summary: Xóa tất cả sản phẩm khỏi giỏ hàng
 *     tags: [ShoppingCart]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Tên người dùng
 *     responses:
 *       200:
 *         description: Giỏ hàng đã được xóa sạch
 */
router.delete("/clear/:username", shoppingCartController.clearCart); // Xóa tất cả sản phẩm khỏi giỏ hàng của người dùng

module.exports = router;
