import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createBrand, deleteBrand, getAllBrand, getSingleBrand, updateBrand } from "../controllers/brand.controller.js";

const router = express.Router();

router
  .route("/brands")
  .post(isLoggedIn, createBrand)
  .get(getAllBrand);
router
  .route("/brands/:id")
  .get(getSingleBrand)
  .put(isLoggedIn, updateBrand)
  .delete(isLoggedIn, deleteBrand);

export default router;
