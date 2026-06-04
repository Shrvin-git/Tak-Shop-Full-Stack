import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error(
    "Please define the MONGO_URL environment variable inside .env",
  );
}

// ایجاد یک Cache برای جلوگیری از ایجاد چندین Connection همزمان
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  // ۱. اگر قبلاً وصل شده بودیم، همان را برگردان
  if (cached.conn) {
    return cached.conn;
  }

  // ۲. اگر اتصالی در جریان نیست، شروع به اتصال کن
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // جلوگیری از بافر شدن دستورات
    };

    cached.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
      console.log("Connect To DB Successfully :))");
      return mongoose;
    });
  }

  // ۳. منتظر بمان تا وعده (Promise) حل شود
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.log("DB Connection Error:", e);
    throw e;
  }

  return cached.conn;
}

export default connectToDB;
