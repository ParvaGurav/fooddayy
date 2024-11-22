// cartRoute.js

import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add an item to the cart
 *     description: This endpoint adds a specified item to the user's cart. If the item already exists, the quantity will be increased by 1.
 *     parameters:
 *       - in: body
 *         name: userId
 *         type: string
 *         required: true
 *         description: The ID of the user adding the item to the cart.
 *       - in: body
 *         name: itemId
 *         type: string
 *         required: true
 *         description: The ID of the item being added to the cart.
 *     responses:
 *       200:
 *         description: Successfully added item to cart
 *       500:
 *         description: Error adding item to cart
 */
cartRouter.post("/add", authMiddleware, addToCart);

/**
 * @swagger
 * /api/cart/remove:
 *   post:
 *     summary: Remove an item from the cart
 *     description: This endpoint removes an item from the user's cart, decreasing its quantity by 1.
 *     parameters:
 *       - in: body
 *         name: userId
 *         type: string
 *         required: true
 *         description: The ID of the user removing the item from the cart.
 *       - in: body
 *         name: itemId
 *         type: string
 *         required: true
 *         description: The ID of the item being removed from the cart.
 *     responses:
 *       200:
 *         description: Successfully removed item from cart
 *       500:
 *         description: Error removing item from cart
 */
cartRouter.post("/remove", authMiddleware, removeFromCart);

/**
 * @swagger
 * /api/cart/get:
 *   post:
 *     summary: Get the user's cart
 *     description: This endpoint retrieves the user's current cart data, including the items and their quantities.
 *     parameters:
 *       - in: body
 *         name: userId
 *         type: string
 *         required: true
 *         description: The ID of the user whose cart is being fetched.
 *     responses:
 *       200:
 *         description: Successfully retrieved user's cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 cartData:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *       500:
 *         description: Error fetching cart data
 */
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;
