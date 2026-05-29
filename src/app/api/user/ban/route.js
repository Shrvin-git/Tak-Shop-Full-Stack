import BanModel from "@/models/Ban";
import UserModel from "@/models/User";
import connectToDB from "../../../../../configs/db";
import { authAdmin, authUser } from "@/utils/auth-server";

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();
    const { email, phone } = body;

    // 1) می‌توانی اینجا ولیدیشن خودت را انجام بدهی

    // 2) ثبت در Ban ها
    await BanModel.create({ email, phone });

    // 3) پیدا کردن کاربر و ست کردن isBan = true
    const user = await UserModel.findOneAndUpdate(
      { email }, // یا { phone } یا ترکیب هر دو
      { isBan: true },
      { new: true },
    );

    if (!user) {
      return Response.json(
        { message: "User not found to ban" },
        { status: 404 },
      );
    }

    return Response.json({
      message: "User banned successfully :))",
      user,
    });
  } catch (err) {
    console.error("Ban error:", err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
