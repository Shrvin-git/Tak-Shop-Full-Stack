import CommentModel from "@/models/Comment";
import ProductModel from "@/models/Product";
import CategorytModel from "@/models/Category";
import connectToDB from "../../../../../configs/db";
import mongoose from "mongoose";
import { authUser } from "@/utils/auth-server";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const id = params.id;

    await CommentModel.findOneAndDelete({ _id: id });
    return Response.json(
      { message: "comment removed successfully " },
      { status: 200 },
    );
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid user id" }, { status: 400 });
    }

    const comments = await CommentModel.find({ user: id })
      .populate({
        path: "product",
        populate: {
          path: "category",
        },
      })
      .sort({ createdAt: -1 });

    return Response.json({ comments }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const { id } = params;
    const { action } = await req.json();
    const user = await authUser();

    if (!user) {
      return Response.json(
        { message: "لطفا ابتدا وارد شوید" },
        { status: 401 },
      );
    }

    const comment = await CommentModel.findById(id);
    if (!comment) {
      return Response.json({ message: "کامنت یافت نشد" }, { status: 404 });
    }

    const userId = user._id.toString();

    let update = {};

    switch (action) {
      case "LIKE": {
        const isLiked = comment.likes.some((x) => x.toString() === userId);

        update = isLiked
          ? { $pull: { likes: user._id, dislikes: user._id } }
          : { $addToSet: { likes: user._id }, $pull: { dislikes: user._id } };

        await CommentModel.findByIdAndUpdate(id, update, { new: true });

        return Response.json(
          { message: isLiked ? "لایک برداشته شد" : "لایک شد" },
          { status: 200 },
        );
      }

      case "DIS_LIKE": {
        const isDisLiked = comment.dislikes.some(
          (x) => x.toString() === userId,
        );

        update = isDisLiked
          ? { $pull: { dislikes: user._id, likes: user._id } }
          : { $addToSet: { dislikes: user._id }, $pull: { likes: user._id } };

        await CommentModel.findByIdAndUpdate(id, update, { new: true });

        return Response.json(
          { message: isDisLiked ? "دیسلایک برداشته شد" : "دیسلایک شد" },
          { status: 200 },
        );
      }

      default:
        return Response.json({ message: "اکشن نامعتبر است" }, { status: 400 });
    }
  } catch (err) {
    return Response.json(
      { message: "خطای سرور", error: err.message },
      { status: 500 },
    );
  }
}
