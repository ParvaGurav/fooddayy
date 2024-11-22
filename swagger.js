import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Food Delivery API",
    version: "1.0.0",
    description: "API documentation for the food delivery service",
  },
  servers: [
    {
      url: "http://localhost:4000",
    },
  ],
};

// Swagger options
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js", "./controllers/*.js"], // Ensure both routes and controllers are included
};

// Initialize Swagger
const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
