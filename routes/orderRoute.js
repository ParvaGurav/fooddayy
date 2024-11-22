// orderRoute.js

import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  updateOrderStatus,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

/**
 * @swagger
 * /api/order/place:
 *   post:
 *     summary: Place a new order
 *     description: This endpoint allows a user to place a new order.
 *     parameters:
 *       - in: body
 *         name: orderData
 *         description: The data of the order being placed.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               description: The ID of the user placing the order.
 *             items:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   foodId:
 *                     type: string
 *                     description: The ID of the food item.
 *                   quantity:
 *                     type: integer
 *                     description: The quantity of the food item.
 *             totalPrice:
 *               type: number
 *               format: float
 *               description: The total price of the order.
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       500:
 *         description: Error placing the order
 */
orderRouter.post("/place", authMiddleware, placeOrder);

/**
 * @swagger
 * /api/order/verify:
 *   post:
 *     summary: Verify the status of an order
 *     description: This endpoint verifies the current status of an order.
 *     parameters:
 *       - in: body
 *         name: orderId
 *         description: The ID of the order to be verified.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             orderId:
 *               type: string
 *               description: The ID of the order.
 *     responses:
 *       200:
 *         description: Order verified successfully
 *       404:
 *         description: Order not found
 */
orderRouter.post("/verify", verifyOrder);

/**
 * @swagger
 * /api/order/userorders:
 *   post:
 *     summary: Get a user's orders
 *     description: This endpoint retrieves all orders placed by a specific user.
 *     parameters:
 *       - in: body
 *         name: userId
 *         description: The ID of the user whose orders are being fetched.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               description: The ID of the user.
 *     responses:
 *       200:
 *         description: Successfully retrieved user's orders
 *       500:
 *         description: Error fetching orders
 */
orderRouter.post("/userorders", authMiddleware, userOrders);

/**
 * @swagger
 * /api/order/list:
 *   get:
 *     summary: List all orders
 *     description: This endpoint lists all orders in the system.
 *     responses:
 *       200:
 *         description: Successfully retrieved list of orders
 *       500:
 *         description: Error retrieving orders
 */
orderRouter.get("/list", listOrders);

/**
 * @swagger
 * /api/order/update:
 *   post:
 *     summary: Update the status of an order
 *     description: This endpoint allows an admin or authorized user to update the status of an order.
 *     parameters:
 *       - in: body
 *         name: orderStatusData
 *         description: The order ID and the new status.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             orderId:
 *               type: string
 *               description: The ID of the order to update.
 *             status:
 *               type: string
 *               description: The new status of the order (e.g., "shipped", "delivered").
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 */
orderRouter.post("/update", updateOrderStatus);

export default orderRouter;
