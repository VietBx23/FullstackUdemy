require("dotenv").config();
const express = require("express");
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
const discountProductRoutes = require("./routes/discountProduct.router");
const warehouseRouter = require("./routes/warehouse.router");
const commentRouter = require("./routes/comment.router");
const replyRouter = require("./routes/reply.router");
// Create express app
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger"); // Import swaggerSpec từ tệp swagger.js

const app = express();
const port = process.env.PORT || 8082;

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
app.use("/users", userRouter);
app.use("/contacts", contactRouter);
app.use("/shopping-cart", shoppingCartRouter);
app.use("/orders", OrderRouter);
app.use("/orderdetails", OrderDetailRouter);
app.use("/imageProducts", ImageProducts);
app.use("/discount-products", discountProductRoutes);
app.use("/warehouses", warehouseRouter);
app.use("/comments", commentRouter);
app.use("/replies", replyRouter);
// Serve Swagger UI tại /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Sử dụng swaggerSpec đã import
// console.log("swager", swaggerSpec);
// Lắng nghe trên port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
