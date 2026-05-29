import CommentModel from "@/models/Comment";
import connectToDB from "../../../../../configs/db";

export async function PUT(req) {
  try {
    await connectToDB();
    const { id } = await req.json();

    if (!id) {
      return Response.json(
        { message: "آیدی کامنت الزامی است" },
        { status: 400 },
      );
    }

    const comment = await CommentModel.findByIdAndUpdate(
      id,
      { $set: { isAccept: false } }, // اصلاح منطقی: رد کردن یعنی false
    );

    if (!comment) {
      return Response.json({ message: "کامنت یافت نشد" }, { status: 404 });
    }

    return Response.json(
      { message: "کامنت با موفقیت رد شد :)" },
      { status: 200 },
    );
  } catch (err) {
    return Response.json(
      { message: "خطای سرور: " + err.message },
      { status: 500 },
    );
  }
}
