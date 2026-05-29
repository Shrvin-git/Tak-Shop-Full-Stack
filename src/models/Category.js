import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema(
  {
    name: String,
    label: String,
  },
  { _id: false },
);

const attributeGroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    icon: String, // یا svgName اگر بخواهید جدا کنید
    attributes: [attributeSchema],
  },
  { _id: false },
);

const highlightSchema = new mongoose.Schema(
  {
    attribute: { type: String, required: true },
    label: { type: String, required: true },
    icon: String,
    order: Number,
  },
  { _id: false },
);

const filterSchema = new mongoose.Schema(
  {
    name: String,
    label: String,
    type: {
      type: String,
      enum: ["select", "range", "checkbox"],
      default: "select",
    },
    options: [String], // فقط برای select و checkbox
  },
  { _id: false },
);

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },

    icon: String,
    image: String,
    description: String,

    parent: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    filters: [filterSchema],

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },

    status: {
      type: String,
      enum: ["active", "draft"],
      default: "active",
    },

    icon: {
      type: String,
      default: "/images/categories/icon/default.js",
    },

    image: {
      type: String,
      default: "/images/categories/image/default.jpg",
    },

    highlights: [highlightSchema],

    attributeGroups: [attributeGroupSchema],
  },
  { timestamps: true },
);

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
