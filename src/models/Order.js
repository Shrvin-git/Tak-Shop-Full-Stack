import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
      },
    ],

    totalPrice: Number,
    discount: Number,
    shipping: Number,
    payable: Number,

    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      postalCode: String,
      province: String,
      city: String,
      plaque: String,
      unit: String,
      email: String,
    },

    status: {
      type: String,
      enum: [
        "cart",
        "pending-payment",
        "paid",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "paid",
    },

    paymentMethod: {
      type: String,
      enum: ["online", "cod", "card"],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
