// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book My Show API",
      version: "1.0.0",
      description: "API documentation for the Book My Show clone",
    },
    servers: [
      {
        url: "https://book-my-show-3lr4.onrender.com",
      },
    ],
  },
  apis: ["./index.js"], // Make sure this matches your main server file name
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
