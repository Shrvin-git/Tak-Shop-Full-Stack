import mongoose from "mongoose";
import connectToDB from "../configs/db.js";
import Product from "../src/models/Product.js";

async function run() {
  try {
    await connectToDB();

    const res = await Product.updateMany(
      { freeShipping: { $exists: false } },
      { $set: { freeShipping: false } },
    );

  } catch (err) {
    console.error("❌ Migration error:", err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

run();
