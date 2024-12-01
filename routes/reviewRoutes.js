import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createReview } from "../controllers/reviews.controller.js";


const router = express.Router();

router.route("/products/:productId/reviews").post(isLoggedIn, createReview)
// router
//   .route("/colors/:id")
//   .get(getSingleColor)
//   .put(isLoggedIn, updateColor)
//   .delete(isLoggedIn, deleteColor);

export default router;
