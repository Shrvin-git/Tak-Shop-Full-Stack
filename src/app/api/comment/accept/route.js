import CommentModel from "@/models/Comment";
import { authAdmin } from "@/utils/auth-server";
import connectToDB from "../../../../../configs/db";

export async function PUT(req) {
  try {
    await connectToDB();

    // const isAdmin = await authAdmin();

    // if (!isAdmin) {
    //   throw new Error("This api protected and you can't access it !!");
    // }
    const { id } = await req.json();

    if (!id) {
      return Response.json(
        { message: "آیدی کامنت الزامی است" },
        { status: 400 },
      );
    }

    const comment = await CommentModel.findByIdAndUpdate(
      id,
      { $set: { isAccept: true } },
      { new: true },
    );

    if (!comment) {
      return Response.json({ message: "کامنت یافت نشد" }, { status: 404 });
    }

    return Response.json(
      { message: "کامنت با موفقیت تایید شد :)" },
      { status: 200 },
    );
  } catch (err) {
    console.error("ACCEPT COMMENT ERROR:", err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
