import Category from "../model/category.schema.js";
import asyncHandler from "express-async-handler";

/*****************************************************
 * @desc   Create a new category
 * @route  POST /api/v1/categories
 * @access Private/Admin
 *****************************************************/

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // category exists
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.status(201).json({
    category,
    msg: "Category created successfully",
  });
});

/*****************************************************
 * @desc   Get all category
 * @route  GET /api/v1/categories
 * @access PUblic
 *****************************************************/

export const getAllCategory = asyncHandler(async (req, res) => {
  const category = await Category.find({});

  res.status(200).json({
    length: category.length,
    category,
    msg: "All category",
  });
});

/*****************************************************
 * @desc   Get single category
 * @route  GET /api/v1/categories/:id
 * @access PUblic
 *****************************************************/

export const getSingleCategory = asyncHandler(async (req, res) => {
  // get single category
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new Error("Category not found");
  }

  res.status(200).json({
    category,
    msg: "Single category",
  });
});

/*****************************************************
 * @desc   update category
 * @route  PUT /api/v1/categories/:id
 * @access PRIVATE/ADMIN
 *****************************************************/

export const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new Error("Category not found");
  }

  await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true, runValidators: true }
  );

  await category.save();

  res.status(200).json({
    category,
    msg: "Category updated successfully",
  });
});

/*****************************************************
 * @desc   Delete category
 * @route  DELETE /api/v1/categories/:id
 * @access PRIVATE/ADMIN
 *****************************************************/

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new Error("Category not found");
  }

  await category.deleteOne();

  res.status(200).json({
    msg: "Category deleted successfully",
  });
});
