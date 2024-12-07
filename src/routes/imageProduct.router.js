const express = require("express");
const router = express.Router();
const imageProductController = require("../controllers/imageProduct.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     ImageProduct:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID của hình ảnh sản phẩm
 *         image:
 *           type: string
 *           description: URL của hình ảnh sản phẩm
 *         product_id:
 *           type: integer
 *           description: ID của sản phẩm liên kết
 *       required:
 *         - image
 *         - product_id
 *       example:
 *         id: 1
 *         image: "imageurl.jpg"
 *         product_id: 101
 */

/**
 * @swagger
 * tags:
 *   name: ImageProducts
 *   description: API quản lý hình ảnh sản phẩm
 */

/**
 * @swagger
 * /imageProducts:
 *   get:
 *     summary: "Lấy danh sách tất cả hình ảnh sản phẩm"
 *     tags: [ImageProducts]
 *     responses:
 *       200:
 *         description: "Danh sách hình ảnh sản phẩm"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ImageProduct'
 */
router.get("/", imageProductController.getAllImageProducts);

/**
 * @swagger
 * /imageProducts/{id}:
 *   get:
 *     summary: "Lấy thông tin hình ảnh sản phẩm theo ID"
 *     tags: [ImageProducts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của hình ảnh sản phẩm.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Thông tin hình ảnh sản phẩm"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageProduct'
 *       404:
 *         description: "Không tìm thấy hình ảnh sản phẩm"
 */
router.get("/:id", imageProductController.getImageProductById);

/**
 * @swagger
 * /imageProducts/product/{product_id}:
 *   get:
 *     summary: "Lấy tất cả hình ảnh của một sản phẩm theo ID sản phẩm"
 *     tags: [ImageProducts]
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: ID của sản phẩm.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Danh sách hình ảnh của sản phẩm"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ImageProduct'
 *       404:
 *         description: "Không tìm thấy hình ảnh cho sản phẩm này"
 */
router.get(
  "/product/:product_id",
  imageProductController.getImageProductByProductId
);

/**
 * @swagger
 * /imageProducts/product/{product_id}/limit5:
 *   get:
 *     summary: "Lấy tối đa 5 hình ảnh của một sản phẩm theo ID sản phẩm"
 *     tags: [ImageProducts]
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: ID của sản phẩm.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Danh sách tối đa 5 hình ảnh của sản phẩm"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ImageProduct'
 *       404:
 *         description: "Không tìm thấy hình ảnh cho sản phẩm này"
 */
router.get(
  "/product/:product_id/limit5",
  imageProductController.getImageProductLimit5
);

/**
 * @swagger
 * /imageProducts:
 *   post:
 *     summary: "Tạo mới hình ảnh sản phẩm"
 *     tags: [ImageProducts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImageProduct'
 *     responses:
 *       201:
 *         description: "Tạo mới hình ảnh sản phẩm thành công"
 *       400:
 *         description: "Thông tin không hợp lệ"
 */
router.post("/", imageProductController.createImageProduct);

/**
 * @swagger
 * /imageProducts/{id}:
 *   put:
 *     summary: "Cập nhật hình ảnh sản phẩm"
 *     tags: [ImageProducts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của hình ảnh sản phẩm.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImageProduct'
 *     responses:
 *       200:
 *         description: "Cập nhật hình ảnh sản phẩm thành công"
 *       404:
 *         description: "Không tìm thấy hình ảnh sản phẩm"
 */
router.put("/:id", imageProductController.updateImageProduct);

/**
 * @swagger
 * /imageProducts/{id}:
 *   delete:
 *     summary: "Xóa hình ảnh sản phẩm"
 *     tags: [ImageProducts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của hình ảnh sản phẩm cần xóa.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Xóa hình ảnh sản phẩm thành công"
 *       404:
 *         description: "Không tìm thấy hình ảnh sản phẩm"
 */
router.delete("/:id", imageProductController.deleteImageProduct);

module.exports = router;
