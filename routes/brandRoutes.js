import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createColor,
  deleteColor,
  getAllColor,
  getSingleColor,
  updateColor,
} from "../controllers/color.controller.js";

const router = express.Router();

router.route("/colors").post(isLoggedIn, createColor).get(getAllColor);
router
  .route("/colors/:id")
  .get(getSingleColor)
  .put(isLoggedIn, updateColor)
  .delete(isLoggedIn, deleteColor);

export default router;
