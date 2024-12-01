import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js";

// import routes
import userRoutes from "../routes/userRoutes.js";
import productRoutes from "../routes/productRoutes.js";
import categoryRoutes from "../routes/categoryRoutes.js";
import brandRoutes from "../routes/brandRoutes.js";
import colorRoutes from "../routes/colorRoutes.js";
import reviewRoutes from "../routes/reviewRoutes.js";
import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";

const app = express();
dbConnect();

// middleware
app.use(express.json());

// mounting routes

app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", brandRoutes);
app.use("/api/v1", colorRoutes);
app.use("/api/v1", reviewRoutes);

// error middleware
app.use(notFound);
app.use(globalErrHandler);

export default app;
