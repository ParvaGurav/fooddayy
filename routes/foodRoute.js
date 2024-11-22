import express from "express";
import multer from "multer";
import { addFood, getAllFoodList, removeFoodItem } from "../controllers/foodController.js";

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callBack) => {
    return callBack(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /api/food/add:
 *   post:
 *     summary: Add a new food item
 *     description: This endpoint allows you to add a new food item with an image.
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *         description: The name of the food item.
 *       - in: formData
 *         name: description
 *         type: string
 *         required: true
 *         description: A brief description of the food item.
 *       - in: formData
 *         name: price
 *         type: number
 *         required: true
 *         description: The price of the food item.
 *       - in: formData
 *         name: category
 *         type: string
 *         required: true
 *         description: The category of the food item.
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *         description: The image of the food item.
 *     responses:
 *       200:
 *         description: Successfully added food item
 *       500:
 *         description: Error adding food item
 */
foodRouter.post("/add", upload.single("image"), addFood);

/**
 * @swagger
 * /api/food/list:
 *   get:
 *     summary: Get all food items
 *     description: This endpoint returns a list of all food items in the database.
 *     responses:
 *       200:
 *         description: A list of food items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: Error fetching food list
 */
foodRouter.get("/list", getAllFoodList);

/**
 * @swagger
 * /api/food/remove:
 *   post:
 *     summary: Remove a food item
 *     description: This endpoint removes a food item from the database and deletes its image from the server.
 *     parameters:
 *       - in: body
 *         name: id
 *         type: string
 *         required: true
 *         description: The ID of the food item to remove.
 *     responses:
 *       200:
 *         description: Successfully removed food item
 *       500:
 *         description: Error removing food item
 */
foodRouter.post("/remove", removeFoodItem);

export default foodRouter;
