import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductsById,
  editProduct,
  updteAvaliablility,
  deleteProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: interger
 *          description: The product id
 *          example: 1
 *        name:
 *          type: string
 *          description: The product name
 *          example: Monitor curvo 49 pulgadas
 *        price:
 *          type: number
 *          description: The product price
 *          example: 500
 *        availability:
 *          type: boolean
 *          description: The product availability
 *          example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list products
 *    tags:
 *      - Products
 *    description: Return a list of produscts
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 *
 */

router.get("/", getProducts);

/**
 *  @swagger
 *  /api/products/{id}:
 *    get:
 *      summary: Get a product
 *      tags:
 *        - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *      - in: path
 *        name: id
 *        description: The Id of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        200:
 *          description: Successful Response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Product'
 *        404:
 *          description: Not Found
 *        400:
 *          description: Bad request invalid Id
 */

router.get(
  "/:id",
  param("id").isInt().withMessage("Id no valido"),
  handleInputErrors,
  getProductsById
);

/**
 *  @swagger
 *  /api/products:
 *    post:
 *      summary: Create a new Product
 *      tags:
 *        - Products
 *      description: Return a new record in the database
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: "Monitor curvo 32 pulgadas"
 *                price:
 *                  type: number
 *                  example: 400
 *      responses:
 *        201:
 *          description: Pruduct created successful
 *        400:
 *          description: Bad request - invalid input data
 */

router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre de Producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  handleInputErrors,
  createProduct
);

/**
 *  @swagger
 *  /api/products/{id}:
 *    put:
 *      summary: Updates a product with user input
 *      tags:
 *        - Products
 *      description: Return the updated product
 *      parameters:
 *      - in: path
 *        name: id
 *        description: The Id of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: "Monitor curvo 32 pulgadas"
 *                price:
 *                  type: number
 *                  example: 400
 *                availability:
 *                  type: boolean
 *                  example: true
 *      responses:
 *        200:
 *          description: Response Successsful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        400:
 *          description: Bad request, invalid Id or invalid input data
 *        404:
 *          description: Not Found
 */

router.put(
  "/:id",
  param("id").isInt().withMessage("Id no valido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre de Producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no valido"),
  handleInputErrors,
  editProduct
);

/**
 *  @swagger
 *  /api/products/{id}:
 *    patch:
 *      summary: Update Product availability
 *      tags:
 *        - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The Id of the product to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Successful Response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        400:
 *          description: Bad Request
 *        404:
 *          description: Not Found
 */

router.patch(
  "/:id",
  param("id").isInt().withMessage("Id no valido"),
  handleInputErrors,
  updteAvaliablility
);

/**
 *  @swagger
 *  /api/products/{id}:
 *    delete:
 *      summary: Delete Product by a given Id
 *      tags:
 *        - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The Id of the product to delete
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Successful Response
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                value: 'Producto eliminado'
 *        400:
 *          description: Bad Request
 *        404:
 *          description: Not Found
 */

router.delete(
  "/:id",
  param("id").isInt().withMessage("Id no valido"),
  handleInputErrors,
  deleteProduct
);

export default router;
