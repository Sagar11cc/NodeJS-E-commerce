import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

router.route("/products").post(isLoggedIn, createProduct).get(getProduct);

router.route("/products/:id").get(getSingleProduct).put(updateProduct).delete(deleteProduct)


export default router;
