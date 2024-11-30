// userRouter.js
const express = require("express");
const UserController = require("../controllers/user.controller");

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: ID của người dùng (tự tăng)
 *          username:
 *            type: string
 *            description: Tên đăng nhập của người dùng (duy nhất)
 *          password:
 *            type: string
 *            description: Mật khẩu đã được mã hóa
 *          email:
 *            type: string
 *            description: Địa chỉ email của người dùng (duy nhất)
 *          fullname:
 *            type: string
 *            description: Họ và tên của người dùng
 *          image:
 *            type: string
 *            description: URL ảnh đại diện của người dùng
 *          jwt_token:
 *            type: string
 *            description: Mã token JWT của người dùng
 *          token_expires_at:
 *            type: string
 *            format: date-time
 *            description: Thời điểm hết hạn của token JWT
 *          created_at:
 *            type: string
 *            format: date-time
 *            description: Thời điểm tạo người dùng
 *          updated_at:
 *            type: string
 *            format: date-time
 *            description: Thời điểm cập nhật người dùng
 *        required:
 *          - username
 *          - password
 *          - email
 *          - fullname
 *        example:
 *          id: 1
 *          username: "john_doe"
 *          password: "hashed_password_here"
 *          email: "john.doe@example.com"
 *          fullname: "John Doe"
 *          image: "https://example.com/image.jpg"
 *          jwt_token: "example_jwt_token"
 *          token_expires_at: "2024-12-31T23:59:59Z"
 *          created_at: "2024-01-01T12:00:00Z"
 *          updated_at: "2024-01-01T12:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API quản lý người dùng
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: "Lấy danh sách tất cả người dùng"
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: "Danh sách người dùng"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", UserController.getAllUsers); // Lấy tất cả người dùng

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: "Lấy người dùng theo ID"
 *     tags: [Users]
 *     description: "Tra ve thong tin tai khoan cua mot nguoi dung"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Thông tin người dùng"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: "Không tìm thấy người dùng"
 */
router.get("/:id", UserController.getUser); // Lấy người dùng theo ID

/**
 * @swagger
 * /users:
 *   post:
 *     summary: "Tạo người dùng mới"
 *     tags: [Users]
 *     description: "create user client"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: "Tạo người dùng thành công"
 *       400:
 *         description: "Thông tin không hợp lệ"
 */
router.post("/", UserController.createUser); // Tạo người dùng mới

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: "Cập nhật người dùng"
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: "Cập nhật người dùng thành công"
 *       404:
 *         description: "Không tìm thấy người dùng"
 */
router.put("/:id", UserController.updateUser); // Cập nhật người dùng

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: "Xóa người dùng"
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần xóa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Xóa người dùng thành công"
 *       404:
 *         description: "Không tìm thấy người dùng"
 */
router.delete("/:id", UserController.deleteUser); // Xóa người dùng

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: "Đăng ký người dùng mới"
 *     tags: [Users]
 *     description: "Tạo tài khoản mới cho người dùng"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               fullname:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: "Đăng ký người dùng thành công"
 *       400:
 *         description: "Thông tin không hợp lệ"
 */
router.post("/signup", UserController.signup); // Đăng ký người dùng mới

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: "Đăng nhập người dùng"
 *     tags: [Users]
 *     description: "Đăng nhập người dùng và nhận token JWT"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Đăng nhập thành công, trả về token JWT"
 *       400:
 *         description: "Thông tin đăng nhập không hợp lệ"
 *       401:
 *         description: "Mật khẩu không đúng"
 */
router.post("/login", UserController.login); // Đăng nhập người dùng

/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: "Quên mật khẩu"
 *     tags: [Users]
 *     description: "Quên mật khẩu người dùng"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Tên người dùng
 *               email:
 *                 type: string
 *                 description: Địa chỉ email của người dùng
 *     responses:
 *       200:
 *         description: "Mật khẩu đã được cập nhật và email thông báo đã được gửi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mật khẩu đã được cập nhật và email đã được gửi!
 *       400:
 *         description: "Lỗi trong quá trình cập nhật mật khẩu."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Username hoặc email không đúng."
 */
router.post("/forgot-password", UserController.forgotPassword); // Quên mật khẩu

/**
 * @swagger
 * /users/update-charge-password:
 *   put:
 *     summary: "Cập nhật mật khẩu sạc cho người dùng"
 *     tags: [Users]
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
 *               oldPassword:
 *                 type: string
 *                 description: Mật khẩu cũ của người dùng
 *               newChargePassword:
 *                 type: string
 *                 description: Mật khẩu sạc mới
 *     responses:
 *       200:
 *         description: "Mật khẩu sạc đã được cập nhật thành công"
 *       400:
 *         description: "Thông tin không hợp lệ hoặc mật khẩu cũ không đúng"
 *       500:
 *         description: "Lỗi máy chủ, không thể cập nhật mật khẩu"
 */

router.put("/update-charge-password", UserController.updateChargePassword); // Cập nhật mật khẩu sạc cho người dùng
/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: "Đăng xuất người dùng"
 *     tags: [Users]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Không yêu cầu dữ liệu đầu vào, chỉ cần token từ header Authorization
 *     responses:
 *       200:
 *         description: "Đăng xuất thành công"
 *       401:
 *         description: "Không có quyền truy cập hoặc token không hợp lệ"
 *       500:
 *         description: "Lỗi máy chủ, không thể đăng xuất"
 */

router.post("/logout", UserController.logout); // Đăng xuất người dùng

module.exports = router;
