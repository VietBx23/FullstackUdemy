const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comment.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID của bình luận
 *         product_id:
 *           type: integer
 *           description: ID của sản phẩm mà bình luận thuộc về
 *         description:
 *           type: string
 *           description: Nội dung của bình luận
 *         username:
 *           type: string
 *           description: Tên người dùng đã tạo bình luận
 *         rating:
 *           type: integer
 *           description: Xếp hạng từ 1 đến 5 cho sản phẩm
 *       required:
 *         - product_id
 *         - description
 *         - username
 *         - rating
 *       example:
 *         id: 1
 *         product_id: 101
 *         description: "Sản phẩm rất tốt, tôi rất hài lòng."
 *         username: "user01"
 *         rating: 5
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API quản lý bình luận sản phẩm
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: "Lấy danh sách tất cả các bình luận"
 *     tags: [Comments]
 *     description: "Trả về danh sách các bình luận của tất cả sản phẩm."
 *     responses:
 *       200:
 *         description: "Danh sách bình luận"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get("/", commentsController.getAllComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: "Lấy thông tin bình luận theo ID"
 *     tags: [Comments]
 *     description: "Trả về thông tin của một bình luận cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của bình luận
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Thông tin bình luận"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: "Không tìm thấy bình luận"
 */
router.get("/:id", commentsController.getCommentById);

/**
 * @swagger
 * /comments/searchProduct/{product_id}:
 *   get:
 *     summary: "Lấy thông tin bình luận theo Product ID"
 *     tags: [Comments]
 *     description: "Trả về thông tin của một bình luận cụ thể."
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: ID của Sản Phẩm
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Thông tin bình luận của sản phẩm"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: "Không tìm thấy bình luận"
 */
router.get(
  "/searchProduct/:product_id",
  commentsController.getCommentsByProductId
);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: "Tạo bình luận mới"
 *     tags: [Comments]
 *     description: "Tạo mới một bình luận cho sản phẩm."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: "Tạo bình luận thành công"
 *       400:
 *         description: "Thông tin không hợp lệ"
 */
router.post("/", commentsController.createComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: "Cập nhật thông tin bình luận"
 *     tags: [Comments]
 *     description: "Cập nhật thông tin bình luận của một sản phẩm với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của bình luận
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: "Cập nhật bình luận thành công"
 *       404:
 *         description: "Không tìm thấy bình luận"
 */
router.put("/:id", commentsController.updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: "Xóa bình luận"
 *     tags: [Comments]
 *     description: "Xóa bình luận của một sản phẩm với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của bình luận cần xóa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Xóa bình luận thành công"
 *       404:
 *         description: "Không tìm thấy bình luận"
 */
router.delete("/:id", commentsController.deleteComment);

module.exports = router;
