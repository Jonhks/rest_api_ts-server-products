import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
    info: {
      title: "REST API Node.js / Express / Typescript",
      version: "1.0.0",
      description: "API Docs for Products",
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
  .topbar-wrapper .link {
    content: url('https://images.squarespace-cdn.com/content/v1/5f62b687cae73d2408a06539/1602807736441-APGY7GLLM1S0PVIC99R9/image-asset.png');
    height: 80px;
    width: auto;
    object-fit: contain;
  }
  .swagger-ui .topbar {
    background-color: black;
    color: red
  }
  `,
  customSiteTitle: "Documentación Rest API | Express | Typescript",
};

export default swaggerSpec;

export { swaggerUiOptions };
