import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
} from "../controllers/category.controller.js";
const router = express.Router();

router
  .route("/categories")
  .post(isLoggedIn, createCategory)
  .get(getAllCategory);
router
  .route("/categories/:id")
  .get(getSingleCategory)
  .put(isLoggedIn, updateCategory)
  .delete(isLoggedIn, deleteCategory);

export default router;
