import mongoose from "mongoose";

// generate random order number
const randomText =
  Math.random().toString(36).substring(2, 5) +
  Math.random().toString(36).substring(2, 5);
const randomNum = Math.floor(1000 + Math.random() * 90000);
const orderSchema = new mongoose.Schema(
  {
    // which user is placing the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // which products are in the order
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],

    // shipping address
    shippingAddress: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      default: randomText + randomNum,
    },

    paymentStatus: {
      type: String,
      required: true,
      default: "Not Paid",
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Not specified",
    },
    currency: {
      type: String,
      required: true,
      default: "Not specified",
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered"],
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
