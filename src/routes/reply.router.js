const express = require("express");
const router = express.Router();
const replyController = require("../controllers/reply.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Reply:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID của phản hồi
 *         product_id:
 *           type: integer
 *           description: ID của sản phẩm
 *         comment_id:
 *           type: integer
 *           description: ID của bình luận mà phản hồi thuộc về
 *         description:
 *           type: string
 *           description: Nội dung của phản hồi
 *         username:
 *           type: string
 *           description: Tên người dùng đã tạo phản hồi
 *       required:
 *         - product_id
 *         - comment_id
 *         - description
 *         - username
 *       example:
 *         id: 1
 *         product_id: 101
 *         comment_id: 201
 *         description: "Phản hồi rất hữu ích, cảm ơn bạn!"
 *         username: "user02"
 */

/**
 * @swagger
 * tags:
 *   name: Replies
 *   description: API quản lý phản hồi cho bình luận
 */

/**
 * @swagger
 * /replies:
 *   get:
 *     summary: "Lấy danh sách tất cả các phản hồi"
 *     tags: [Replies]
 *     description: "Trả về danh sách tất cả các phản hồi."
 *     responses:
 *       200:
 *         description: "Danh sách phản hồi"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reply'
 */
router.get("/", replyController.getAllReplies);

/**
 * @swagger
 * /replies/{id}:
 *   get:
 *     summary: "Lấy thông tin phản hồi theo ID"
 *     tags: [Replies]
 *     description: "Trả về thông tin của một phản hồi cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của phản hồi
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Thông tin phản hồi"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reply'
 *       404:
 *         description: "Không tìm thấy phản hồi"
 */
router.get("/:id", replyController.getReplyById);

/**
 * @swagger
 * /replies/product/{productId}/comment/{commentId}:
 *   get:
 *     summary: "Lấy phản hồi theo Product ID và Comment ID"
 *     tags: [Replies]
 *     description: "Trả về thông tin các phản hồi theo ID sản phẩm và ID bình luận."
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID của sản phẩm
 *         schema:
 *           type: integer
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID của bình luận
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Danh sách phản hồi"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reply'
 *       404:
 *         description: "Không tìm thấy phản hồi"
 */
router.get(
  "/product/:productId/comment/:commentId",
  replyController.getReplyByProductIdAndCommentId
);

/**
 * @swagger
 * /replies:
 *   post:
 *     summary: "Tạo phản hồi mới"
 *     tags: [Replies]
 *     description: "Tạo mới một phản hồi cho bình luận."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reply'
 *     responses:
 *       201:
 *         description: "Tạo phản hồi thành công"
 *       400:
 *         description: "Thông tin không hợp lệ"
 */
router.post("/", replyController.createNewReply);

/**
 * @swagger
 * /replies/{id}:
 *   put:
 *     summary: "Cập nhật thông tin phản hồi"
 *     tags: [Replies]
 *     description: "Cập nhật thông tin phản hồi với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của phản hồi
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reply'
 *     responses:
 *       200:
 *         description: "Cập nhật phản hồi thành công"
 *       404:
 *         description: "Không tìm thấy phản hồi"
 */
router.put("/:id", replyController.updateReply);

/**
 * @swagger
 * /replies/{id}:
 *   delete:
 *     summary: "Xóa phản hồi"
 *     tags: [Replies]
 *     description: "Xóa phản hồi với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của phản hồi cần xóa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Xóa phản hồi thành công"
 *       404:
 *         description: "Không tìm thấy phản hồi"
 */
router.delete("/:id", replyController.deleteReply);

module.exports = router;
