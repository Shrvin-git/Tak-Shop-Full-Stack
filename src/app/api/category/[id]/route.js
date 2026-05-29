import Category from "@/models/Category";
import connectToDB from "../../../../../configs/db";


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
