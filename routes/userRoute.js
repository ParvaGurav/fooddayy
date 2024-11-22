// userRoute.js

import express from "express";
import { login, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows a new user to register in the system.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The registration data for the user.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: The username of the user.
 *             password:
 *               type: string
 *               description: The password for the user.
 *             email:
 *               type: string
 *               description: The email of the user.
 *     responses:
 *       200:
 *         description: Successfully registered the user
 *       400:
 *         description: Bad request, missing or incorrect fields
 *       500:
 *         description: Error registering the user
 */
userRouter.post("/register", registerUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     description: This endpoint allows an existing user to log in to the system and get a token.
 *     parameters:
 *       - in: body
 *         name: loginData
 *         description: The login credentials of the user.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: The username of the user.
 *             password:
 *               type: string
 *               description: The password for the user.
 *     responses:
 *       200:
 *         description: Successfully logged in, returns a JWT token
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Error logging in the user
 */
userRouter.post("/login", login);

export default userRouter;
