import express from "express";
import cors from "cors";
import "dotenv/config";
import { swaggerSpec, swaggerUi } from "./swagger.js";

// import configs
import { connectDB } from "./config/DB.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
// port
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Db connection
connectDB();

// Api endpoints
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log("Swagger docs are available at http://localhost:4000/api-docs");
});
