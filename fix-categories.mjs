import mongoose from "mongoose";

await mongoose.connect(
  "mongodb+srv://shrvindavoodi_db_user:61JQtWSORV0Jdj71@cluster0.d3psjek.mongodb.net/tak-shop?retryWrites=true&w=majority&appName=Cluster0",
); // connection string خودت

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({ slug: String }),
);
const Product = mongoose.model(
  "Product",
  new mongoose.Schema({ category: mongoose.Schema.Types.Mixed }),
);

const cat = await Category.findOne({ slug: "laptop-accessories" });
const result = await Product.updateMany(
  { category: "laptop-accessories" },
  { $set: { category: cat._id } },
);

console.log("Updated:", result.modifiedCount);
await mongoose.disconnect();
