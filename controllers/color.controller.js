import Color from "../model/color.schema.js";
import asyncHandler from "express-async-handler";

/*****************************************************
 * @desc   Create a new color
 * @route  POST /api/v1/colors
 * @access Private/Admin
 *****************************************************/

export const createColor = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // category exists
  const colorExists = await Color.findOne({ name });
  if (colorExists) {
    throw new Error("Color already exists");
  }

  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.status(201).json({
    color,
    msg: "color created successfully",
  });
});

/*****************************************************
 * @desc   Get all colors
 * @route  GET /api/v1/colors
 * @access PUblic
 *****************************************************/

export const getAllColor = asyncHandler(async (req, res) => {
  const color = await Color.find({});

  res.status(200).json({
    length: color.length,
    color,
    msg: "All color",
  });
});

/*****************************************************
 * @desc   Get single color
 * @route  GET /api/v1/colors/:id
 * @access PUblic
 *****************************************************/

export const getSingleColor = asyncHandler(async (req, res) => {
  // get single color
  const color = await Color.findById(req.params.id);

  if (!color) {
    throw new Error("color not found");
  }

  res.status(200).json({
    color,
    msg: "Single color",
  });
});

/*****************************************************
 * @desc   update color
 * @route  PUT /api/v1/colors/:id
 * @access PRIVATE/ADMIN
 *****************************************************/

export const updateColor = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const color = await Color.findById(req.params.id);
  if (!color) {
    throw new Error("color not found");
  }

  await Color.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true, runValidators: true }
  );

  await color.save();

  res.status(200).json({
    color,
    msg: "color updated successfully",
  });
});

/*****************************************************
 * @desc   Delete color
 * @route  DELETE /api/v1/brands/:id
 * @access PRIVATE/ADMIN
 *****************************************************/

export const deleteColor = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  if (!color) {
    throw new Error("color not found");
  }

  await color.deleteOne();

  res.status(200).json({
    msg: "color deleted successfully",
  });
});
