const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BACKEND NODEJS API PROJECT",
      version: "1.0.0",
      description: "API BACKEND NODEJS",
    },
  },
  apis: [__dirname + "/routes/*.js"], // Đường dẫn đầy đủ
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
module.exports = swaggerDocs;
