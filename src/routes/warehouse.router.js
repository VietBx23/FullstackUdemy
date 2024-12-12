const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Warehouse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID của kho hàng
 *         product_id:
 *           type: integer
 *           description: ID của sản phẩm
 *         size:
 *           type: integer
 *           description: Kích thước của kho hàng (dạng số nguyên)
 *         color:
 *           type: string
 *           description: Màu sắc của kho hàng
 *         quantity:
 *           type: integer
 *           description: số lượng
 *       required:
 *         - product_id
 *         - size
 *         - color
 *         - location
 *       example:
 *         id: 1
 *         product_id: 1
 *         size: 39
 *         color: "Black"
 *         quantity: 1
 */

/**
 * @swagger
 * tags:
 *   name: Warehouses
 *   description: API quản lý kho hàng
 */

/**
 * @swagger
 * /warehouses:
 *   get:
 *     summary: "Lấy danh sách tất cả các kho hàng"
 *     tags: [Warehouses]
 *     description: "Trả về danh sách tất cả các kho hàng."
 *     responses:
 *       200:
 *         description: "Danh sách kho hàng"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Warehouse'
 */
router.get("/", warehouseController.getAllWarehouses);

/**
 * @swagger
 * /warehouses/{id}:
 *   get:
 *     summary: "Lấy thông tin kho hàng theo ID"
 *     tags: [Warehouses]
 *     description: "Trả về thông tin kho hàng của một kho với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của kho hàng.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Thông tin kho hàng"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       404:
 *         description: "Không tìm thấy kho hàng"
 */
router.get("/:id", warehouseController.getWarehouseById);
/**
 * @swagger
 * /warehouses/search/{product_id}/{size}/{color}:
 *   get:
 *     summary: "Tìm kho hàng theo kích thước, màu sắc và ID sản phẩm"
 *     tags: [Warehouses]
 *     description: "Trả về danh sách kho hàng phù hợp với kích thước, màu sắc và ID sản phẩm được chỉ định."
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: ID của sản phẩm.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: size
 *         required: true
 *         description: Kích thước của kho hàng.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: color
 *         required: true
 *         description: Màu sắc của kho hàng.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Danh sách kho hàng phù hợp với tiêu chí"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   quantity:
 *                     type: integer
 *       404:
 *         description: "Kho hàng không tìm thấy"
 *       500:
 *         description: "Lỗi khi truy vấn"
 */

router.get(
  "/search/:product_id/:size/:color",
  warehouseController.getWarehouseBySizeColorProductId
);

/**
 * @swagger
 * /warehouses:
 *   post:
 *     summary: "Tạo mới kho hàng"
 *     tags: [Warehouses]
 *     description: "Tạo mới một kho hàng với thông tin được cung cấp."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Warehouse'
 *     responses:
 *       201:
 *         description: "Tạo mới kho hàng thành công"
 *       400:
 *         description: "Thông tin không hợp lệ"
 */
router.post("/", warehouseController.createWarehouse);

/**
 * @swagger
 * /warehouses/{id}:
 *   put:
 *     summary: "Cập nhật kho hàng"
 *     tags: [Warehouses]
 *     description: "Cập nhật thông tin kho hàng của một kho với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của kho hàng.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Warehouse'
 *     responses:
 *       200:
 *         description: "Cập nhật kho hàng thành công"
 *       404:
 *         description: "Không tìm thấy kho hàng"
 */
router.put("/:id", warehouseController.updateWarehouse);

/**
 * @swagger
 * /warehouses/{id}:
 *   delete:
 *     summary: "Xóa kho hàng"
 *     tags: [Warehouses]
 *     description: "Xóa kho hàng của một kho với ID cụ thể."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của kho hàng cần xóa.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Xóa kho hàng thành công"
 *       404:
 *         description: "Không tìm thấy kho hàng"
 */
router.delete("/:id", warehouseController.deleteWarehouse);

module.exports = router;
