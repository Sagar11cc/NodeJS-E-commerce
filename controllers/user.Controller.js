import User from "../model/user.schema.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

/*****************************************************
 * @desc   Register a new user
 * @route  POST /api/v1/users/register
 * @access Private/Admin
 *****************************************************/

export const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  // check user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    // res.status(400).json({
    //   msg: "User already exists",
    // });
    throw new Error("User already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    user,
    msg: "User registered successfully",
  });
});

/*****************************************************
 * @desc   Login user
 * @route  POST /api/v1/users/login
 * @access Public
 *****************************************************/

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({
      msg: "Invalid credentials",
    });
  }

  // check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (user && isMatch) {
    res.status(200).json({
      user,
      token: generateToken(user._id),
      msg: "User logged in successfully",
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

/*****************************************************
 * @desc  get user profile
 * @route  POST /api/v1/users/profile
 * @access Private
 *****************************************************/

export const getUserProfile = asyncHandler(async (req, res) => {
  // get token from header

  const token = getTokenFromHeader(req);

  // verfiy token
  const verified = verifyToken(token);
  console.log(verified);

  res.json({
    token,
    msg: "Welcome to profile page",
  });
});
