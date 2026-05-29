const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان مقاله الزامی است"],
      trim: true,
      maxlength: [150, "عنوان نباید بیشتر از 150 کاراکتر باشد"],
    },
    slug: {
      type: String,
      required: [true, "اسلاگ (Slug) الزامی است"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // برای جستجوی سریع‌تر
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [300, "خلاصه مقاله نباید بیشتر از 300 کاراکتر باشد"],
    },
    content: {
      type: Object, // همچنان برای EditorJS مناسب است
      required: [true, "محتوای مقاله الزامی است"],
    },
    coverImage: {
      type: String,
      default: "/images/articles/default.jpg",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی مقاله الزامی است"],
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "نویسنده مقاله الزامی است"],
    },
    readingTime: {
      type: Number,
      default: 3, // زمان تقریبی مطالعه به دقیقه
    },
    views: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: false, // پیش‌فرض روی پیش‌نویس (Draft) باشد بهتر است
    },
    type: {
      type: String,
      enum: [
        "news",
        "review",
        "suggestion",
        "guide",
        "comparison",
        "tutorial",
        "analysis",
      ],
      default: "news",
    },
  },
  {
    timestamps: true, // اضافه شدن خودکار createdAt و updatedAt
    toJSON: { virtuals: true }, // برای استفاده از virtualها
    toObject: { virtuals: true },
  },
);

// برای ارتباط معکوس کامنت‌ها (اگر مدل Comment دارید)
schema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "article",
});

const model = mongoose.models.Article || mongoose.model("Article", schema);

export default model;
