require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRouter = require("./routes/web");
const accountRoutes = require("./routes/account.routes");
const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.routes");
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
app.use("/users", userRouter);

// Serve Swagger UI tại /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Sử dụng swaggerSpec đã import
console.log("swager", swaggerSpec);
// Lắng nghe trên port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
