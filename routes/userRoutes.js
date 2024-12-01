import express from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
} from "../controllers/user.Controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const router = express.Router();

router.route("/users/register").post(registerUser);
router.route("/users/login").post(loginUser);
router.route("/users/profile").get(isLoggedIn, getUserProfile);

export default router;
