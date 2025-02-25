require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library"); // Thêm thư viện Google
const jwt = require("jsonwebtoken"); // Thêm JWT
const configViewEngine = require("./config/viewEngine");
const webRouter = require("./routes/web");
const accountRoutes = require("./routes/account.routes");
const productRouter = require("./routes/product.route");
const categorieRouter = require("./routes/categories.routes");
const userRouter = require("./routes/user.routes");
const contactRouter = require("./routes/contact.routes");
const shoppingCartRouter = require("./routes/shopping-cart.routes");
const OrderRouter = require("./routes/orders.router");
const OrderDetailRouter = require("./routes/orderDetail.router");
const ImageProducts = require("./routes/imageProduct.router");
const Voucher = require("./routes/voucher.routes");
const warehouseRouter = require("./routes/warehouse.router");
const commentRouter = require("./routes/comment.router");
const replyRouter = require("./routes/reply.router");
const discountProductRoutes = require("./routes/discountProduct.router");
const roleRouter = require("./routes/role.router");
const authoritiesRouter = require("./routes/authorities.router");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
const port = process.env.PORT || 8081;

// Cấu hình Google Auth
const GOOGLE_CLIENT_ID =
  "965256866011-jlh1kddr9q0o3177hhf91s20bbdd0o90.apps.googleusercontent.com";
const JWT_SECRET = process.env.JWT_SECRET || "my-secret-key"; // Lấy từ .env, hoặc mặc định
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// ✅ Thêm CORS Middleware
app.use(
  cors({
    origin: "http://localhost:3001", // Cập nhật port frontend (Vite mặc định 3000 hoặc 5173)
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Cấu hình middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình view engine (nếu có)
configViewEngine(app);

// Đăng ký các router
app.use("/v1", webRouter);
app.use("/accounts", accountRoutes);
app.use("/api/products", productRouter);
app.use("/api/categories", categorieRouter);
app.use("/users", userRouter); // Lưu ý: Endpoint Google Login không xung đột vì là /users/google-login
app.use("/contacts", contactRouter);
app.use("/shopping-cart", shoppingCartRouter);
app.use("/orders", OrderRouter);
app.use("/orderdetails", OrderDetailRouter);
app.use("/imageProducts", ImageProducts);
app.use("/vouchers", Voucher);
app.use("/warehouses", warehouseRouter);
app.use("/comments", commentRouter);
app.use("/replies", replyRouter);
app.use("/discount-products", discountProductRoutes);
app.use("/roles", roleRouter);
app.use("/authorities", authoritiesRouter);

// Serve Swagger UI tại /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Lắng nghe trên port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
