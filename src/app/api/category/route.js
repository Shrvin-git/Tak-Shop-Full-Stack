import connectToDB from "../../../../configs/db";
import CategoryModel from "@/models/Category";

export async function POST(req) {
  await connectToDB();
  try {
    const body = await req.json();

    const newAtrribute = await CategoryModel.create(body);

    return Response.json(
      { message: "category created successfully :)", newAtrribute },
      { status: 201 },
    );
  } catch (err) {
    return Response.json(
      {
        message: "server has error",
        error: err.message, // پیام خطا
        stack: err.stack, // (اختیاری) جزئیات خطا
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  await connectToDB();
  try {
    const allCategories = await CategoryModel.find({});

    return Response.json({ allCategories }, { status: 200 });
  } catch (err) {
    return Response.json(
      {
        message: "server has error",
        error: err.message,
        stack: err.stack,
      },
      { status: 500 },
    );
  }
}
