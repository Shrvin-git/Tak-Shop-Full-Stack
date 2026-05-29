import CommentModel from "@/models/Comment";
import { authAdmin, authUser } from "@/utils/auth-server";
import connectToDB from "../../../../../configs/db";

export async function PUT(req, { params }) {
  await connectToDB();

  try {
    const commentId = params.id;
    const userId = await authUser();

    const comment = await CommentModel.findById(commentId);

    if (comment.likes.includes(userId)) {
      // اگر قبلاً لایک کرده، حذف کن (Unlike)
      await CommentModel.findByIdAndUpdate(commentId, {
        $pull: { likes: userId },
      });
    } else {
      // اگر لایک نکرده، اضافه کن (Like) و از دیس‌لایک هم حذف کن
      await CommentModel.findByIdAndUpdate(commentId, {
        $addToSet: { likes: userId },
        $pull: { dislikes: userId },
      });
    }
  } catch (err) {
    console.error("LIKE COMMENT ERROR:", err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
