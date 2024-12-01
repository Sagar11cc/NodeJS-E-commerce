import Brand from "../model/brand.schema.js";
import Category from "../model/category.schema.js";
import Product from "../model/product.schema.js";
import asyncHandler from "express-async-handler";

/*****************************************************
 * @desc   Create a new product
 * @route  POST /api/v1/products
 * @access Private/Admin
 *****************************************************/

export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
  } = req.body;

  const brandExists = await Brand.findOne({ nam: brand });
  if (brandExists) {
    throw new Error("Brand already exists");
  }

  // Product exists
  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Error("Product already exists");
  }

  const brandFound = await Brand.findOne({ name: brand.toLowerCase() });

  if (!brandFound) {
    throw new Error("Brand not found");
  }

  // find the category
  const categoryFound = await Category.findOne({ name: category });

  if (!categoryFound) {
    throw new Error("Category not found");
  }

  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    brand,
  });

  // push the product to category
  categoryFound.products.push(product._id);
  await categoryFound.save();

  // push the product to brand
  brandFound.products.push(product._id);
  await brandFound.save();

  res.status(201).json({
    product,
    msg: "Product created successfully",
  });
});

/*****************************************************
 * @desc   Get all products
 * @route  GET /api/v1/products
 * @access Public
 *****************************************************/

export const getProduct = asyncHandler(async (req, res) => {
  // query
  let productQuery = Product.find({});

  // search by name
  if (req.query.name) {
    productQuery = productQuery.find({
      name: {
        $regex: req.query.name,
        $options: "i",
      },
    });
  }

  // filter by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: {
        $regex: req.query.brand,
        $options: "i",
      },
    });
  }

  // filter by category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: {
        $regex: req.query.category,
        $options: "i",
      },
    });
  }

  // filter by color
  if (req.query.colors) {
    productQuery = productQuery.find({
      colors: {
        $regex: req.query.colors,
        $options: "i",
      },
    });
  }
  // filter by sizes
  if (req.query.sizes) {
    productQuery = productQuery.find({
      sizes: {
        $regex: req.query.sizes,
        $options: "i",
      },
    });
  }

  // filter by price range
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    console.log(priceRange);
    productQuery = productQuery.find({
      price: {
        $gte: priceRange[0],
        $lte: priceRange[1],
      },
    });
  }

  // pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Product.countDocuments();

  productQuery = productQuery.skip(startIndex).limit(limit);

  // pagination results
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  const products = await productQuery.populate("reviews");

  res.status(200).json({
    length: products.length,
    pagination,
    total,
    products,
    msg: "All products",
  });
});

/*****************************************************
 * @desc   Get single products
 * @route  GET /api/v1/products/:id
 * @access Public
 *****************************************************/

export const getSingleProduct = asyncHandler(async (req, res) => {
  const products = await Product.findById(req.params.id).populate("reviews");
  if (!products) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    products,
    msg: "Single product",
  });
});

/*****************************************************
 * @desc   update  products
 * @route  PUT /api/v1/products/:id
 * @access Admin/private
 *****************************************************/

export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
  } = req.body;

  // product exists
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // update product
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      brand,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    updatedProduct,
    msg: "Product updated successfully",
  });
});

/*****************************************************
 * @desc   Delete  products
 * @route  DELETE /api/v1/products/:id
 * @access Admin/private
 *****************************************************/

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();

  res.status(200).json({
    msg: "Product deleted successfully",
  });
});
