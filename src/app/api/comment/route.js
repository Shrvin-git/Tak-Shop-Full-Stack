import CommentModel from "@/models/Comment";
import UserModel from "@/models/User";
import Product from "@/models/Product";
import { authUser } from "@/utils/auth-server";
import connectToDB from "../../../../configs/db";

// ساخت کامنت جدید
export async function POST(req) {
  try {
    await connectToDB();

    const user = await authUser();
    if (!user) {
      return Response.json({ message: "unauthorized" }, { status: 401 });
    }

    const { title, score, body, product } = await req.json();

    // اعتبارسنجی ساده
    if (!title || !body || !product) {
      return Response.json(
        { message: "title, body و product الزامی هستند" },
        { status: 400 },
      );
    }

    // بررسی وجود محصول
    const productDoc = await Product.findById(product);
    if (!productDoc) {
      return Response.json({ message: "محصول یافت نشد" }, { status: 404 });
    }

    const comment = await CommentModel.create({
      title,
      score,
      body,
      user: user._id,
      product,
    });

    // به‌روزرسانی محصول: اضافه کردن کامنت و افزایش شمارنده
    await Product.findByIdAndUpdate(product, {
      $push: { comments: comment._id },
      $inc: { numComment: 1 },
    });

    return Response.json(
      {
        message: "کامنت با موفقیت ایجاد شد",
        commentId: comment._id,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/comments error:", err);
    return Response.json({ message: "server has error" }, { status: 500 });
  }
}

// گرفتن همه کامنت‌ها
export async function GET() {
  try {
    await connectToDB();

    const comments = await CommentModel.find({})
      .populate("user", "name email profileImage")
      .populate("product", "title price");

    return Response.json({ comments }, { status: 200 });
  } catch (err) {
    console.error("GET /api/comments error:", err);
    return Response.json({ message: "server has error" }, { status: 500 });
  }
}
