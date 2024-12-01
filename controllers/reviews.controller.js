import Review from "../model/review.schema.js";
import Product from "../model/product.schema.js";
import asyncHandler from "express-async-handler";

/*****************************************************
 * @desc   Create a new review
 * @route  POST /api/v1/reviews
 * @access Private/
 *****************************************************/

export const createReview = asyncHandler(async (req, res) => {
  const { rating, message, products } = req.body;
  const { productId } = req.params;

  const productFound = await Product.findById(productId).populate("reviews");
  console.log(productFound);
  if (!productFound) {
    res.status(404);
    throw new Error("Product not found");
  }

  // check if user already reviewed this product
  const hasReviewed = productFound?.reviews?.find((review) => {
    return review.user.toString() === req.userAuthId.toString();
  });

  if (hasReviewed) {
    res.status(400);
    throw new Error("You already reviewed this product");
  }

  const review = await Review.create({
    user: req.userAuthId,
    products: productFound._id,
    rating,
    message,
  });


  // push review to product reviews array
  productFound.reviews.push(review._id);

  //   resave
  await productFound.save();
  res.json({
    length: productFound.reviews.length,
    reviews: productFound.reviews,
    message: "Review created",
  });
});
