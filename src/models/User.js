const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    address: {
      type: String,
      default: "",
      required: false,
    },

    postalCode: {
      type: String,
      required: false,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    refreshToken: {
      type: String,
    },

    lastLogin: {
      type: Date,
    },

    wishlist: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],

    cart: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
      },
    ],

    isBan: {
      type: Boolean,
      default: false,
    },

    profileImage: {
      type: String,
      default: "/images/User Panel/user-profile.jpg",
    },

    notifications: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
        title: { type: String, required: true },
        message: { type: String, required: true },
        icon: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now },
        read: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true },
);

const model = mongoose.models.User || mongoose.model("User", schema);
export default model;
