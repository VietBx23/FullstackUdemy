// const swaggerJSDoc = require("swagger-jsdoc");

// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Learning Nodejs Project",
//       version: "1.0.0",
//       description: "FULL API PROJECT",
//     },
//   },
//   apis: [__dirname + "/routes/account.routes.js"], // Đường dẫn đầy đủ
// };

// const swaggerSpec = swaggerJSDoc(swaggerOptions); // Định nghĩa spec một lần duy nhất

// module.exports = swaggerSpec; // Xuất spec ra để sử dụng ở các tệp khác
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Account API",
      version: "1.0.0",
      description: "API quản lý tài khoản",
    },
  },
  apis: [__dirname + "/routes/*.js"], // Đường dẫn đầy đủ
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
module.exports = swaggerDocs;
