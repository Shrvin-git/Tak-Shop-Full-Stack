import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema(
  {
    name: String, // cpu
    value: String, // intel i7
  },
  { _id: false },
);

const variantSchema = new mongoose.Schema(
  {
    name: String, // color / size
    value: String, // red / xl
    price: Number,
    stock: Number,
    sku: String,
    image: String,
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    shortDescription: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
    },

    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    brand: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
    },

    stock: {
      type: Number,
      default: 0,
    },

    sku: {
      type: String,
    },

    images: [
      {
        type: String,
      },
    ],

    attributes: [attributeSchema],

    variants: [variantSchema],

    dimensions: {
      weight: String,
      width: String,
      height: String,
      length: String,
    },

    tags: [String],

    score: {
      type: Number,
      default: 0,
    },

    numComment: {
      type: Number,
      default: 0,
    },

    comments: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Comment",
        },
      ],
    },

    sold: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "draft"],
      default: "active",
    },

    freeShipping: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
