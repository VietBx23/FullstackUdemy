const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID của danh mục
 *         name:
 *           type: string
 *           description: Tên danh mục
 *         available:
 *           type: boolean
 *           description: Trạng thái khả dụng
 *       required:
 *         - name
 *       example:
 *         id: 1
 *         name: "Nike"
 *         available: true
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API quản lý danh mục
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Lấy danh sách tất cả danh mục
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Danh sách danh mục
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/", categoriesController.getAllCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Lấy thông tin danh mục theo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID danh mục
 *     responses:
 *       200:
 *         description: Thông tin danh mục
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.get("/:id", categoriesController.getCategoriesById);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Tạo mới danh mục
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Danh mục được tạo thành công
 *       500:
 *         description: Lỗi máy chủ
 */
router.post("/", categoriesController.createCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Cập nhật thông tin danh mục theo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID danh mục
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Danh mục được cập nhật thành công
 *       404:
 *         description: Không tìm thấy danh mục
 *       500:
 *         description: Lỗi máy chủ
 */
router.put("/:id", categoriesController.updateCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Xóa danh mục theo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID danh mục
 *     responses:
 *       200:
 *         description: Danh mục đã được xóa thành công
 *       404:
 *         description: Không tìm thấy danh mục
 *       500:
 *         description: Lỗi máy chủ
 */
router.delete("/:id", categoriesController.deleteCategories);

module.exports = router;
