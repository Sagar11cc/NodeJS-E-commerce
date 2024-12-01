import Brand from "../model/brand.schema.js";
import asyncHandler from "express-async-handler";

/*****************************************************
 * @desc   Create a new brand
 * @route  POST /api/v1/brands
 * @access Private/Admin
 *****************************************************/

export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // category exists
  const brandExists = await Brand.findOne({ name });
  if (brandExists) {
    throw new Error("Brand already exists");
  }

  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.status(201).json({
    brand,
    msg: "Brand created successfully",
  });
});

/*****************************************************
 * @desc   Get all brands
 * @route  GET /api/v1/brands
 * @access PUblic
 *****************************************************/

export const getAllBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.find({});

  res.status(200).json({
    length: brand.length,
    brand,
    msg: "All brand",
  });
});

/*****************************************************
 * @desc   Get single brand
 * @route  GET /api/v1/brands/:id
 * @access PUblic
 *****************************************************/

export const getSingleBrand = asyncHandler(async (req, res) => {
  // get single Brand
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    throw new Error("Brand not found");
  }

  res.status(200).json({
    brand,
    msg: "Single Brand",
  });
});

/*****************************************************
 * @desc   update brand
 * @route  PUT /api/v1/brands/:id
 * @access PRIVATE/ADMIN
 *****************************************************/

export const updateBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    throw new Error("brand not found");
  }

  await Brand.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true, runValidators: true }
  );

  await brand.save();

  res.status(200).json({
    brand,
    msg: "brand updated successfully",
  });
});

/*****************************************************
 * @desc   Delete brand
 * @route  DELETE /api/v1/brands/:id
 * @access PRIVATE/ADMIN
 *****************************************************/

export const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    throw new Error("brand not found");
  }

  await brand.deleteOne();

  res.status(200).json({
    msg: "brand deleted successfully",
  });
});
